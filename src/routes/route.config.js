export const DEFAULT_ROUTE = "/"
export const LOGIN = "login"
export const CATEGORY_MANAGEMENT = "categories";
export const CATEGORY_DETAIL = `/${CATEGORY_MANAGEMENT}/:categoryName`;
export const INDUSTRY_MANAGEMENT = "industries";
export const PRODUCT_MANAGEMENT = "products";
export const ORDER_MANAGEMENT = "order";

export const breadcrumbRoutes = [
    { path: DEFAULT_ROUTE, breadcrumb: "Home" },
    { path: CATEGORY_MANAGEMENT, breadcrumb: "Categories" },
    { path: PRODUCT_MANAGEMENT, breadcrumb: "Products" },
    { path: ORDER_MANAGEMENT, breadcrumb: "Orders" },
    { path: INDUSTRY_MANAGEMENT, breadcrumb: "Industries" },
    {
        path: CATEGORY_DETAIL,
        breadcrumb: (props) => DynamicBreadcrumb(props, "categoryName"),
    },

]

const DynamicBreadcrumb = ({ match }, propName) => {
    return match.params[propName];
};