import { useEffect, useLayoutEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net";

const initialShops = [];

const ShopDataTable = () => {
  const [shops, setShops] = useState(initialShops);
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editShop, setEditShop] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addShop, setAddShop] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
    image: null,
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [addImageFile, setAddImageFile] = useState(null);
  const tableRef = useRef();
  const dataTableRef = useRef(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const userId = sessionStorage.getItem("id");
        const response = await fetch("http://127.0.0.1:5000/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "shops",
            columns: [
              "id",
              "name",
              "address",
              "lat",
              "lng",
              "shopcode",
              "image",
              "path",
              "rating",
              "user_id"
            ],
            condition: userId ? `user_id = '${userId}'` : ""
          }),
        });
        if (!response.ok) throw new Error("Failed to fetch shops");
        const data = await response.json();

        const imageMap = {
          // "abs": absImage,
          // "ajf": ajfImage,
        };

        const formatted = data.map(shop => ({
          ...shop,
          image: imageMap[shop.shopcode] || shop.image || null
        }));

        setShops(formatted);


      } catch (err) {
        console.error(err);
        setShops([]);
      }
    };

    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(search.toLowerCase()) ||
    shop.address.toLowerCase().includes(search.toLowerCase()) ||
    shop.shopcode.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      }

      if (filteredShops.length > 0 && tableRef.current) {
        dataTableRef.current = $(tableRef.current).DataTable({
          paging: false,
          destroy: true,
        });

        setTimeout(() => {
          const searchInput = document.querySelector('.dataTables_filter input[type="search"]');
          if (searchInput) {
            searchInput.id = "dt-search-1";
          }
        }, 0);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      }
    };
  }, [filteredShops]);

  // Edit Modal Handlers
  const handleEditClick = (shop) => {
    setEditShop(shop);
    setEditImageFile(null);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditShop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditImageFile(e.target.files[0]);
    }
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditShop(null);
    setEditImageFile(null);
  };


    const handleSaveEdit = async () => {
    if (!editShop) return;

    const formData = new FormData();
    formData.append("table", "shops");

    // Prepare updates object
    const updates = {
      name: editShop.name,
      address: editShop.address,
      lat: editShop.lat,
      lng: editShop.lng,
    };

    // If a new image is selected, update the image field and append the file
    if (editImageFile) {
      updates.image = editImageFile.name; // update DB with new file name
      formData.append("image", editImageFile); // actual file
    }

    formData.append("updates", JSON.stringify(updates));
    formData.append("condition", `id = '${editShop.id}'`);

    try {
      const response = await fetch("http://localhost:5000/update", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        window.location.reload(); // reload to reflect new image
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setEditModalOpen(false);
    setEditShop(null);
    setEditImageFile(null);
  };

  // Add Modal Handlers
  const handleOpenAddModal = () => {
    setAddShop({
      name: "",
      address: "",
      lat: "",
      lng: "",
      image: null,
    });
    setAddImageFile(null);
    setAddModalOpen(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddShop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAddImageFile(e.target.files[0]);
    }
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    setAddShop({
      name: "",
      address: "",
      lat: "",
      lng: "",
      image: null,
    });
    setAddImageFile(null);
  };

const handleSaveAdd = async () => {
  console.log("Add Shop Values:");
  console.log("Name:", addShop.name);
  console.log("Address:", addShop.address);
  console.log("Lat:", addShop.lat);
  console.log("Lng:", addShop.lng);
  console.log("Image File:", addImageFile);

  const formData = new FormData();

  // Required for your `/insert` route
  formData.append("table", "shops");

  const userId = sessionStorage.getItem("id") || "";
  // Add both "image" (file name) and "image_uploaded" (actual file)
  const columns = ["name", "address", "lat", "lng", "shopcode", "image", "user_id"];
  const values = [
    addShop.name,
    addShop.address,
    addShop.lat,
    addShop.lng,
    "", // shopcode (default empty)
    addImageFile ? addImageFile.name : "", // image: file name
    userId,
  ];

  formData.append("columns", JSON.stringify(columns));
  formData.append("values", JSON.stringify(values));

  if (addImageFile) {
    formData.append("image_uploaded", addImageFile); // actual file
  }

  try {
    const response = await fetch("http://localhost:5000/insert", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      window.location.reload();  
    } else {
      console.error("Insert failed:", result.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  // Reset form and close modal
  setShops((prev) => [
    ...prev,
    {
      ...addShop,
      id: Date.now(),
      image: addImageFile ? URL.createObjectURL(addImageFile) : null,
      rating: null,
      shopcode: "",
      user_id: userId,
    },
  ]);
  setAddModalOpen(false);
  setAddShop({
    name: "",
    address: "",
    lat: "",
    lng: "",
    image: null,
  });
  setAddImageFile(null);
};

  return (
    <main>
      <div className="container">
        <div className="shops-wrapper">
          <section className="shops-heading-wrapper | h1-container container padding-block-80">
            <div className="shops-bg-container | bg-container-filter-blue"></div>
            <h1 className="main-headings">Local Repair Shops</h1>
            <div className="shops-profile-search">
              <input
                type="text"
                className="shops-search-bar | margin-block-32"
                placeholder="Search for repair shop here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </section>

          {/* Add Modal Button */}
          <div style={{ margin: "16px 0" }}>
            <button onClick={handleOpenAddModal}>Add Shop</button>
          </div>

          {/* Add Modal */}
          {addModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1000
              }}
            >
              <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }}>
                <h2>Add Shop</h2>
                <div style={{ marginBottom: 8 }}>
                  <label>Name:</label>
                  <input
                    name="name"
                    value={addShop.name}
                    onChange={handleAddChange}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label>Address:</label>
                  <input
                    name="address"
                    value={addShop.address}
                    onChange={handleAddChange}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label>Lat:</label>
                  <input
                    name="lat"
                    value={addShop.lat}
                    onChange={handleAddChange}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label>Lng:</label>
                  <input
                    name="lng"
                    value={addShop.lng}
                    onChange={handleAddChange}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label>Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddImageChange}
                  />
                  {addImageFile && (
                    <div style={{ marginTop: 8 }}>
                      <img
                        src={URL.createObjectURL(addImageFile)}
                        alt="Preview"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 16 }}>
                  <button onClick={handleSaveAdd} style={{ marginRight: 8 }}>Save</button>
                  <button onClick={handleCloseAddModal}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          <section className="shops-profile-section | container padding-block-80">
            <div className="shops-profilie-wrapper">
              {filteredShops.length === 0 ? (
                <p>No Results Found</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table
                    ref={tableRef}
                    className="display"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Lat</th>
                        <th>Lng</th>
                        <th>Image</th>
                        <th>Rating</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredShops.map((shop) => {
                        let ratingObj = null;
                        if (shop.rating) {
                          if (typeof shop.rating === "string") {
                            try {
                              ratingObj = JSON.parse(shop.rating);
                            } catch {
                              ratingObj = null;
                            }
                          } else if (typeof shop.rating === "object") {
                            ratingObj = shop.rating;
                          }
                        }

                        return (
                          <tr key={shop.id}>
                            <td>{shop.id}</td>
                            <td>{shop.name}</td>
                            <td>{shop.address}</td>
                            <td>{shop.lat}</td>
                            <td>{shop.lng}</td>
                            <td>
                              {shop.image ? (
                                <img src={typeof shop.image === "string" && shop.image.startsWith("blob:") ? shop.image : 'repairShops/' + shop.image} alt={shop.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                              ) : (
                                "No image"
                              )}
                            </td>
                            <td>
                              {ratingObj ? (
                                <>
                                  1 Star: {ratingObj["1"] ?? 0}<br />
                                  2 Stars: {ratingObj["2"] ?? 0}<br />
                                  3 Stars: {ratingObj["3"] ?? 0}<br />
                                  4 Stars: {ratingObj["4"] ?? 0}<br />
                                  5 Stars: {ratingObj["5"] ?? 0}
                                </>
                              ) : (
                                "No ratings"
                              )}
                            </td>
                            <td>
                              <button onClick={() => handleEditClick(shop)}>
                                Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && editShop && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }}>
            <h2>Edit Shop</h2>
            <div style={{ marginBottom: 8 }}>
              <label>Name:</label>
              <input
                name="name"
                value={editShop.name}
                onChange={handleEditChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Address:</label>
              <input
                name="address"
                value={editShop.address}
                onChange={handleEditChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Lat:</label>
              <input
                name="lat"
                value={editShop.lat}
                onChange={handleEditChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Lng:</label>
              <input
                name="lng"
                value={editShop.lng}
                onChange={handleEditChange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
              />
              {(editImageFile || editShop.image) && (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={
                      editImageFile
                        ? URL.createObjectURL(editImageFile)
                        : (typeof editShop.image === "string" && editShop.image.startsWith("blob:"))
                          ? editShop.image
                          : 'repairShops/' + editShop.image
                    }
                    alt="Preview"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              <button onClick={handleSaveEdit} style={{ marginRight: 8 }}>Save</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ShopDataTable;
