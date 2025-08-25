import { Outlet } from "react-router-dom";
import { redirect } from "react-router-dom";
export function loader({ params }) {
  console.log(params);
  const { mediaType, id } = params;
  if (mediaType !== "movie" && mediaType !== "tv") {
    throw new Error(`Error: /${mediaType}/${id} doesnt exist`);
  }
  return null;
}
export default function DetailsLayout() {
  return (
    <>
      <div>
        <p>Media layout</p>
      </div>
      <Outlet />
    </>
  );
}
