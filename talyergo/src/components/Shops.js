import { StarEmpty } from "../svgs/StarEmpty";
import { StarFilled } from "../svgs/StarFilled";
import { StarHalf } from "../svgs/StarHalf";
import { useShops } from './ShopsContext';

export const Shops = () => {
    const shops = useShops();
   return (
    <main>
        <div className="container">

            <div className="shops-wrapper">
                
                <section className="shops-heading-wrapper | h1-container container padding-block-80">
                    <div class="shops-bg-container | bg-container-filter-blue"></div>
                    <h1 className="main-headings">Local Repair Shops</h1>
                    <div className="shops-profile-search">
                        <input type="text" className="shops-search-bar | margin-block-32" placeholder="Search for repair shop here"/>
                    </div>
                </section>

                <section className="shops-profile-section | container padding-block-80">
                    <div className="shops-profilie-wrapper">
                        {shops.map((shop) => {
                             return (<div key={shop.name} className="shops-profile">
                                <img src={shop.image} alt={shop.name}/>
                                <h3>{shop.name}</h3>
                                <div className="ratings-wrapper">
                                    <p>4.5</p>
                                    <div className="star-wrapper">
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled />
                                        <StarHalf/>
                                    </div>
                                    <p>(399)</p>    
                                </div> 
                                <p>{shop.address}</p>
                            </div>
                             );
                        })}
                    </div>
                </section>
                
            </div>

        </div>
    </main>
   ); 
}