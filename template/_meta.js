export default {
  index: {
    title: "Home",
    type: "page",
    icon: "material-symbols:home",
  },
  docs: {
    title: "Documentation",
    type: "menu",
    icon: "material-symbols:menu-book",
    items: {
      "getting-started": {
        title: "Getting Started",
        icon: "material-symbols:rocket-launch",
        href: "/en/docs/getting-started",
      },
      installation: {
        title: "Installation",
        icon: "material-symbols:install-desktop",
        href: "/en/docs/installation",
      },
      configuration: {
        title: "Configuration",
        icon: "material-symbols:settings",
        href: "/en/docs/configuration",
      },
    },
  },
  examples: {
    title: "Examples",
    type: "page",
    icon: "material-symbols:code-blocks",
  },
  about: {
    title: "About",
    type: "page",
    icon: "material-symbols:info",
  },
  download: {
    title: "Download",
    type: "page",
    icon: "material-symbols:download",
    theme: {
      layout: "full",
    },
  },
};
