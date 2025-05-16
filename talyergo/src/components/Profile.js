import { useParams } from "react-router-dom";
import { Reviews } from "./Reviews";
import { useShops } from './ShopsContext';

export const Profile = () => {
    const shops = useShops();
    const { userId } = useParams();

    const currentShop = shops.find(shop => shop.shopcode === userId);

    let shopName = "";
    let shopAddress = "";
    let shopImage = shops[1].image; 
    let shopPath = "";
    let shopEmail = "N/A";
    let shopContact = "N/A";
    let shopRatings = 3.7;

    if (currentShop) {
        shopName = currentShop.name;
        shopAddress = currentShop.address;
        shopImage = currentShop.image;
        shopPath = currentShop.path;
    }

    return(
        <main>
            <section>
                <div className="container">
                    <div className="user-primary-section">
                        <div className="cover-container">
                            <img className="cover-photo" src={shopImage}/>
                        </div>
                        <div className="primary-user-section">
                            <div className="profile-photo-container">
                                <img className="profile-photo" src={shopImage}/>
                            </div>
                            <div>
                                <h3 className="shop-name">{shopName}</h3>
                                <div className="primary-user-description">
                                    <div>
                                        <h3>Ratings: {shopRatings}</h3>
                                        <h3>Contact: {shopContact}</h3>                                    
                                    </div>
                                    <div>
                                        <h3>Email: {shopEmail}</h3> 
                                        <h3 className="user-address">Address: {shopAddress}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="shop-content | margin-block-32">
                        <div className="shop-info">

                        </div>
                        <Reviews />
                    </div>
                </div>
            </section>
        </main>
    );
}