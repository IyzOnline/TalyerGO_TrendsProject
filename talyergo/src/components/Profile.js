import { useParams } from "react-router-dom";

export const Profile = () => {
    const { userId } = useParams();

    return(
        <section>
            <div className="container">
                <div className="">
                    {userId}
                </div>
            </div>
        </section>
    );
}