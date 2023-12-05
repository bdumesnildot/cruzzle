import i18next from "i18next";

const localeText = {
  toolbarDensity: i18next.t("datagrid.toolbarDensity"),
  toolbarDensityLabel: i18next.t("datagrid.toolbarDensityLabel"),
  toolbarDensityCompact: i18next.t("datagrid.toolbarDensityCompact"),
  toolbarDensityStandard: i18next.t("datagrid.toolbarDensityStandard"),
  toolbarDensityComfortable: i18next.t("datagrid.toolbarDensityComfortable"),
  toolbarFilters: i18next.t("datagrid.toolbarFilters"),
  toolbarFiltersLabel: i18next.t("datagrid.toolbarFiltersLabel"),
  toolbarFiltersTooltipHide: i18next.t("datagrid.toolbarFiltersTooltipHide"),
  toolbarFiltersTooltipShow: i18next.t("datagrid.toolbarFiltersTooltipShow"),
  toolbarFiltersTooltipActive: (count) =>
    i18next.t("datagrid.toolbarFiltersTooltipActive", { count }),
  toolbarColumns: i18next.t("datagrid.toolbarColumns"),
  toolbarColumnsLabel: i18next.t("datagrid.toolbarColumnsLabel"),
  toolbarColumnsTooltipHide: i18next.t("datagrid.toolbarColumnsTooltipHide"),
  toolbarColumnsTooltipShow: i18next.t("datagrid.toolbarColumnsTooltipShow"),
  toolbarColumnsTooltipActive: (count) =>
    i18next.t("datagrid.toolbarColumnsTooltipActive", { count }),
  toolbarColumnsHideAll: i18next.t("datagrid.toolbarColumnsHideAll"),
  toolbarColumnsShowAll: i18next.t("datagrid.toolbarColumnsShowAll"),
  toolbarExport: i18next.t("datagrid.toolbarExport"),
  toolbarExportLabel: i18next.t("datagrid.toolbarExportLabel"),
  toolbarExportCSV: i18next.t("datagrid.toolbarExportCSV"),
  toolbarExportExcel: i18next.t("datagrid.toolbarExportExcel"),
  toolbarExportSelected: i18next.t("datagrid.toolbarExportSelected"),
  toolbarExportSelectedLabel: i18next.t("datagrid.toolbarExportSelectedLabel"),
  toolbarExportPrint: i18next.t("datagrid.toolbarExportPrint"),
  noRowsLabel: i18next.t("datagrid.noRowsLabel"),
  errorOverlayDefaultLabel: i18next.t("datagrid.errorOverlayDefaultLabel"),
  filterRowReset: i18next.t("datagrid.filterRowReset"),
  filterRowApply: i18next.t("datagrid.filterRowApply"),
  filterRowPlaceholder: i18next.t("datagrid.filterRowPlaceholder"),
  filterRowFilterTooltip: i18next.t("datagrid.filterRowFilterTooltip"),
  paginationFirst: i18next.t("datagrid.paginationFirst"),
  paginationFirstTooltip: i18next.t("datagrid.paginationFirstTooltip"),
  paginationPrevious: i18next.t("datagrid.paginationPrevious"),
  paginationPreviousTooltip: i18next.t("datagrid.paginationPreviousTooltip"),
  paginationNext: i18next.t("datagrid.paginationNext"),
  paginationNextTooltip: i18next.t("datagrid.paginationNextTooltip"),
  paginationLast: i18next.t("datagrid.paginationLast"),
  paginationLastTooltip: i18next.t("datagrid.paginationLastTooltip"),
  paginationLabelRowsPerPage: i18next.t("datagrid.paginationLabelRowsPerPage"),
  paginationLabelDisplayedRows: ({ from, to, count }) =>
    i18next.t("datagrid.paginationLabelDisplayedRows", { from, to, count }),
};

export default localeText;
