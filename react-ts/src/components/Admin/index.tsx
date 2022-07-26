import AdminContentItem from "../AdminContentItem";
import {
  useDeleteCatMutation,
  useGetCatsQuery,
} from "../../graphql/generated/schemas";

import "./style.css";

const Admin = () => {
  const { loading, data, refetch } = useGetCatsQuery();
  const [deleteCat] = useDeleteCatMutation();

  const onDeleteClick = async (id: string) => {
    await deleteCat({ variables: { id: Number(id) } });
    await refetch();
  };

  if (loading) return <p>Loading ...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="admin_wrapper">
      <div className="admin_header">
        <div>Admin</div>
        <a className="add-cat" href="/admin/add-cat">
          Add cat
        </a>
      </div>

      <div className="admin_content">
        <ul className="list">
          {data.cats.map((cat) => (
            <li className="list_item">
              <AdminContentItem
                key={cat.url + cat.id}
                id={cat.id}
                url={cat.url}
                likes={cat.likes}
                deleteCat={onDeleteClick}
                createdAt={undefined}
                updatedAt={undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
