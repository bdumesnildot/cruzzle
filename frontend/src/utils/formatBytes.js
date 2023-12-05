import i18next from "i18next";

export default function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return `0 ${i18next.t("pages.ideas.ideanew.formatbytes.bytes")}`;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const sizes = [
    i18next.t("pages.ideas.ideanew.formatbytes.bytes"),
    i18next.t("pages.ideas.ideanew.formatbytes.kb"),
    i18next.t("pages.ideas.ideanew.formatbytes.mb"),
    i18next.t("pages.ideas.ideanew.formatbytes.gb"),
    i18next.t("pages.ideas.ideanew.formatbytes.tb"),
    i18next.t("pages.ideas.ideanew.formatbytes.pb"),
    i18next.t("pages.ideas.ideanew.formatbytes.eb"),
    i18next.t("pages.ideas.ideanew.formatbytes.zb"),
    i18next.t("pages.ideas.ideanew.formatbytes.yb"),
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
