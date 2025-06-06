<template>
  <div
    ref="export"
    class="zenuml bg-skin-canvas flex flex-col w-full h-full"
    :class="theme"
  >
    <!-- We have enabled important: ".zenuml" for tailwind.
        1. Don't use inline-block as class name here. Other clients may not have .zenuml at ancestor level.
        2. .zenuml is used to make sure tailwind css takes effect.
      -->
    <!-- pb-8 is to offset pt-8 in SeqDiagram component
      .whitespace-nowrap will be inherited by all children
    -->
    <debug />
    <div
      class="frame text-skin-base bg-skin-frame border-skin-frame relative origin-top-left whitespace-nowrap border rounded h-full flex flex-col justify-between"
    >
      <div ref="content">
        <div
          class="header text-skin-title bg-skin-title border-skin-frame border-b p-1 flex justify-between rounded-t"
        >
          <div class="left hide-export">
            <slot></slot>
          </div>
          <div class="right flex-grow flex justify-between">
            <diagram-title id="title-bar" :context="title" />
            <!-- Knowledge: how to vertically align a svg icon. -->
          </div>
        </div>
        <div>
          <div
            v-if="showTips"
            class="fixed z-40 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <TipsDialog />
          </div>
        </div>
        <seq-diagram
          ref="diagram"
          :style="{ transform: `scale(${scale})` }"
          class="origin-top-left"
        />
      </div>
      <div
        class="hide-export footer text-skin-control bg-skin-title px-4 py-1 flex justify-between items-center gap-3 mt-2"
      >
        <template v-if="mode === RenderMode.Dynamic">
          <div class="flex items-center gap-3 color-base hide-export">
            <button
              class="bottom-1 flex items-center left-1 hide-export"
              @click="showTipsDialog()"
            >
              <Icon name="tip" icon-class="filter grayscale w-4 h-4" />
            </button>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="order-display"
                class="mr-1"
                :checked="numbering"
                @input="toggleNumbering(!numbering)"
              />
              <h1 class="text-xs">Show Numbering</h1>
            </div>
            <div class="zoom-controls flex hide-export gap-1">
              <button class="zoom-in" @click="zoomIn()">
                <Icon name="zoom-in" icon-class="w-4 h-4" />
              </button>
              <button class="zoom-out" @click="zoomOut()">
                <Icon name="zoom-out" icon-class="w-4 h-4" />
              </button>
              <label class="w-12 block text-center text-xs"
                >{{ Number(scale * 100).toFixed(0) }}%</label
              >
            </div>
            <div class="export-controls flex items-center">
              <button
                class="export-jpeg text-xs bg-blue-500 rounded-lg color-white px-2 py-1"
                @click="toJpeg()"
              >
                Export JPEG
              </button>
            </div>
          </div>
        </template>
      </div>
      <width-provider />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import DiagramTitle from "./DiagramTitle/DiagramTitle.vue";
import SeqDiagram from "./SeqDiagram/SeqDiagram.vue";
import TipsDialog from "./Tutorial/TipsDialog.vue";
import WidthProvider from "./Positioning/WidthProvider.vue";
import * as htmlToImage from "html-to-image";
import Debug from "./Debug/Debug.vue";
import Icon from "@/components/Icon/Icon.vue";
import { RenderMode } from "@/store/Store";

export default {
  name: "DiagramFrame",
  setup() {
    return {
      RenderMode,
    };
  },
  computed: {
    ...mapState([
      "showTips",
      "scale",
      "theme",
      "numbering",
      "enableMultiTheme",
      "mode",
    ]),
    ...mapGetters(["rootContext"]),
    title() {
      if (!this.rootContext) {
        console.error(
          "`rootContext` is empty. Please make sure `store` is properly configured.",
        );
      }
      return this.rootContext?.title();
    },
  },
  mounted() {
    // https://stackoverflow.com/a/64429013/529187
    // Expose component instance so we can access toPng and other methods.
    this.$el.__vue__ = this;
  },
  methods: {
    ...mapMutations(["setScale", "toggleNumbering"]),
    showTipsDialog() {
      this.$store.state.showTips = true;

      try {
        this.$gtag?.event("view", {
          event_category: "help",
          event_label: "tips dialog",
        });
      } catch (e) {
        console.error(e);
      }
    },
    toJpeg() {
      const diagramTitle = document.getElementById("title-bar").textContent;
      htmlToImage
        .toJpeg(this.$refs["content"], {
          backgroundColor: "white",
          filter: (node) => {
            return !node?.classList?.contains("hide-export");
          },
        })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = diagramTitle + ".jpeg";
          link.href = dataUrl;
          link.click();
        });
    },
    zoomIn() {
      const newScale = Math.min(1, this.scale + 0.1);
      this.setScale(newScale);
    },
    zoomOut() {
      this.setScale(this.scale - 0.1);
    },
    setTheme(theme) {
      this.theme = theme;
    },
    setStyle(style) {
      const styleElementId = "zenuml-style";
      // check if style element exists
      let styleElement = document.getElementById(styleElementId);
      if (!styleElement) {
        // create a style element and inject the content as textContent
        styleElement = document.createElement("style");
        // give the element a unique id
        styleElement.id = styleElementId;
        document.head.append(styleElement);
      }
      styleElement.textContent = style;
    },
    setRemoteCss(url) {
      const hostname = new URL(url).hostname;

      // if url is from github, we fetch the raw content and set the style
      // if url contains github.com or githubusercontent.com, we fetch the raw content and set the style
      if (
        hostname === "https://github.com" ||
        hostname === "https://githubusercontent.com"
      ) {
        fetch(
          url
            .replace("github.com", "raw.githubusercontent.com")
            .replace("blob/", ""),
        )
          .then((response) => response.text())
          .then((text) => {
            this.setStyle(text);
          });
        return;
      }
      const remoteCssUrlId = "zenuml-remote-css";
      // check if remote css element exists
      let remoteCssElement = document.getElementById(remoteCssUrlId);
      if (!remoteCssElement) {
        // create a style element and inject the content as textContent
        remoteCssElement = document.createElement("link");
        // give the element a unique id
        remoteCssElement.id = remoteCssUrlId;
        remoteCssElement.rel = "stylesheet";
        document.head.append(remoteCssElement);
      }
      remoteCssElement.href = url;
    },
  },
  components: {
    Icon,
    Debug,
    WidthProvider,
    TipsDialog,
    DiagramTitle,
    SeqDiagram,
  },
};
</script>
