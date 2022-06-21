export const DEFAULT_ROUTE = "/";
export const LOGIN = "login";
export const CATEGORY_MANAGEMENT = "categories";
export const CATEGORY_DETAIL = `/${CATEGORY_MANAGEMENT}/:categoryName`;
export const INDUSTRY_MANAGEMENT = "industries";
export const PRODUCT_MANAGEMENT = "products";
export const NEW_PRODUCT = `/${PRODUCT_MANAGEMENT}/new`;
export const EDIT_PRODUCT = `/${PRODUCT_MANAGEMENT}/:productName`;
export const EDIT_PRODUCT_FROM_CATEGORY = `${CATEGORY_MANAGEMENT}/:categoryName/:productName`;
export const ADD_PRODUCT_FROM_CATEGORY = `${CATEGORY_MANAGEMENT}/:categoryName/new-product`;
export const ORDER_MANAGEMENT = "order";
export const ORDER_DETAIL = `/order/:orderId`;
export const USER_INFO_MANAGEMENT = "userinfo";

export const breadcrumbRoutes = [
    { path: DEFAULT_ROUTE, breadcrumb: "Home" },
    { path: CATEGORY_MANAGEMENT, breadcrumb: "Categories" },
    { path: PRODUCT_MANAGEMENT, breadcrumb: "Products" },
    { path: ORDER_MANAGEMENT, breadcrumb: "Orders" },
    {
        path: CATEGORY_DETAIL,
        breadcrumb: (props) => DynamicBreadcrumb(props, "categoryName"),
    },
    {
        path: EDIT_PRODUCT,
        breadcrumb: (props) => DynamicBreadcrumb(props, "productName"),
    },
    {
        path: ADD_PRODUCT_FROM_CATEGORY,
        breadcrumb: "Add",
    },
    {
        path: EDIT_PRODUCT_FROM_CATEGORY,
        breadcrumb: (props) => DynamicBreadcrumb(props, "productName"),
    },
]

const DynamicBreadcrumb = ({ match }, propName) => {
    return match.params[propName];
};

