import CustomBreadcrumb from "components/shared/CustomBreadcrumb";
import React, { useEffect, useState } from "react";
import { Col, notification, Row, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditableContainer from "components/shared/EditableText";
import { AddProduct, ProductCard } from "components/Products/Products";
import { CATEGORY_MANAGEMENT } from "routes/route.config";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  categoryUpdated,
  getAllCategories,
  selectCategoryById,
} from "store/categorySlice";
import { axios } from "lib/axios/Interceptor";
import { ENP_CATEGORY, ENP_GET_PRODUCT } from "api/EndPoint";

const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const category =
    useSelector((state) => selectCategoryById(state, categoryName)) || {};

  console.log(category);

  const onUpdateDescription = (value) => {
    axios.put(ENP_CATEGORY + category._id, { description: value }).then(() => {
      dispatch(
        categoryUpdated({
          id: value.name,
          changes: { description: value.description },
        })
      );
    });
  };

  const deleteProduct = (prodId) => {
    axios.delete(ENP_GET_PRODUCT + prodId).then((res) => {
      notification.success({
        message: "Product deleted!",
      });
      const updatedProduct = products.filter((p) => p.id != prodId);
      setProducts([...updatedProduct]);
    });
  };

  useEffect(() => {
    const getInitialData = async () => {
      dispatch(getAllCategories());
      const response = await axios.get(ENP_CATEGORY + category.name);

      setProducts(response.data.products);
    };

    getInitialData();
  }, []);

  return (
    <div>
      <div className="bg-white p-9 pl-6 pt-4">
        <CustomBreadcrumb />
        <div className="pt-4 flex">
          <div className="flex-1">
            <h2 className="cursor-pointer">{category.name}</h2>
            <Tooltip title="Click to start editing" placement="rightTop">
              <span>
                <EditableContainer updateApi={onUpdateDescription}>
                  <EditableContainer.Text value={category.description} />
                </EditableContainer>
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-center mt-5">In this category</h3>

        <div className="mt-2">
          <Row gutter={[8, 8]}>
            <Col className="gutter-row" span={6}>
              <AddProduct
                path={`/${CATEGORY_MANAGEMENT}/${categoryName}/new-product`}
                state={{ categoryId: category.name }}
              />
            </Col>
            {products &&
              products.length > 0 &&
              products.map((item) => (
                <Col className="gutter-row" span={6} key={item._id}>
                  <ProductCard
                    title={item.name}
                    onEditPressed={() =>
                      navigate(
                        `/${CATEGORY_MANAGEMENT}/${categoryName}/${item.name}`,
                        { state: { id: item._id } }
                      )
                    }
                    price={item.price}
                    stockStatus={item.inStock}
                    image={item.image}
                    id={item._id}
                    categoryId={category.name}
                    onDeleteProduct={() => dispatch(deleteProduct(item._id))}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Category;
