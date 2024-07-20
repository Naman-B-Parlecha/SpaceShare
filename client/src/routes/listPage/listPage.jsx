import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const post = useLoaderData();
  console.log(post);
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={post.postResponse}
              errorElement={<p>failed to load posts</p>}
            >
              {(postResponse) => {
                if (postResponse.data.length > 0) {
                  return postResponse.data.map((item) => (
                    <Card key={item.id} item={item} />
                  ));
                }
                return <>No Property available for your needs 😔</>
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={post.postResponse}
            errorElement={<p>failed to load posts</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
