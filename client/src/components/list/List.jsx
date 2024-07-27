import "./list.scss";
import Card from "../card/Card";

function List({ posts }) {
  return posts.length > 0 ? (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <p>no posts</p>
  );
}

export default List;
