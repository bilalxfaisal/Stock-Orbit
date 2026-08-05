/**
 * Stock configuration.
 *
 * allowManualContainerSelection
 *   - true  : the caller must supply a `containerId` when stocking in a
 *             product, and that exact container is used.
 *   - false : any `containerId` sent by the caller is ignored, and the
 *             system automatically picks a random container that belongs
 *             to the product's category and has enough free capacity.
 *
 * This is a plain, hardcoded constant on purpose (per project
 * requirements) — change the value below and restart the server to take
 * effect. It is also exposed read-only via GET /config/stock-settings so
 * the frontend can adapt its UI (e.g. hide the container picker).
 */
export const stockConfig = {
    allowManualContainerSelection: false,
};
