import { Link } from "react-router-dom";

const PostOrganisasi = ({ lembaga }) => {
  // Pastikan lembaga dan lembaga.slug tidak undefined
  if (!lembaga || !lembaga.idLembaga) {
    return <div>Error: Lembaga data is missing or invalid</div>;
  }

  return (
    <div>
      <Link to={`/lembaga/${lembaga.slug}`}>{lembaga.slug}</Link>
    </div>
  );
};

export default PostOrganisasi;
