const { input } = require("@saltcorn/markup/tags");
const db = require("@saltcorn/data/db");
const { isNode } = require("@saltcorn/data/utils");

const onLoad = async () => {
  if (isNode())
    await db.query('create extension if not exists "uuid-ossp";');
};

const uuid = {
  name: "UUID",
  sql_name: isNode() ? "uuid" : "text",
  primaryKey: isNode()
    ? { default_sql: "uuid_generate_v4()" }
    : { default_js: () => crypto.randomUUID() },
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
        return v || null;
      default:
        return undefined;
    }
  },
};

module.exports = {
  sc_plugin_api_version: 1,
  types: [uuid],
  onLoad,
  ready_for_mobile: true,
};
