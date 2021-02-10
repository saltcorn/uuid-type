const { input } = require("@saltcorn/markup/tags");

const uuid = {
  name: "UUID",
  sql_name: "uuid",
  primaryKey: { default_sql: "uuid_generate_v4()" },
  fieldviews: {
    show: { isEdit: false, run: (v) => v || "" },
    editHTML: {
      isEdit: true,
      run: (nm, v, attrs, cls, required, field) =>
        input({
          type: "text",
          disabled: attrs.disabled,
          class: ["form-control", cls],
          "data-fieldname": field.name,
          name: nm,
          id: `input${nm}`,
          value: v || "",
        }),
    },
  },
  read: (v) => {
    switch (typeof v) {
      case "string":
        return v;
      default:
        return undefined;
    }
  },
};

module.exports = { sc_plugin_api_version: 1, types: [uuid] };
