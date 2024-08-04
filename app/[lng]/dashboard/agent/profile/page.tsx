import ProfilePage from "../../shared/profile/ProfilePage";

const page = ({ params: { lng } }: { params: { lng: string } }) => {
    return <ProfilePage lng={lng} />
};

export default page;