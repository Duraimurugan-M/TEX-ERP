import { useEffect, useState } from "react";
import API from "../../api/axios";
import styles from "./ProductPage.module.css";
import Layout from "../../components/layout/Layout";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "RAW_MATERIAL",
    uom: "",
    description: "",
  });

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", formData);

      setFormData({
        name: "",
        code: "",
        category: "RAW_MATERIAL",
        uom: "",
        description: "",
      });

      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating product");
    }
  };

  return (
     <Layout>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Product Master</h2>

        {/* Product Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="code"
            placeholder="Product Code"
            value={formData.code}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="RAW_MATERIAL">Raw Material</option>
            <option value="WIP">WIP</option>
            <option value="FINISHED_GOOD">Finished Good</option>
            <option value="CONSUMABLE">Consumable</option>
          </select>

          <input
            type="text"
            name="uom"
            placeholder="UOM (Kg / Meter)"
            value={formData.uom}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">Add Product</button>
        </form>

        {/* Product Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Category</th>
                <th>Description</th>
                <th>UOM</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>{prod.code}</td>
                  <td>{prod.category}</td>
                  <td>{prod.description}</td>
                  <td>{prod.uom}</td>
                  <td>
                    {prod.is_active ? (
                      <span className={styles.active}>Active</span>
                    ) : (
                      <span className={styles.inactive}>Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ProductPage;