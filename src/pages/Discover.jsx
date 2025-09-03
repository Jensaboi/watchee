import { Form, useActionData, useRouteLoaderData } from "react-router";
import { fetchWithQueryFilters } from "../lib/tmdbApi";
import Dropdown from "../components/ui/Dropdown";
import Button from "../components/ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
export async function action({ request }) {
  const formData = await request.formData();

  const data = await fetchWithQueryFilters();
  return;
}
export default function Discover() {
  const data = useActionData();
  const { config, movieGenres, tvGenres } = useRouteLoaderData("root");

  return (
    <>
      <section>
        <Form className="" method="GET">
          <div>
            <label htmlFor="movie">
              Movies
              <input
                defaultChecked
                id="movie"
                value="movie"
                name="media-type"
                type="radio"
              />
            </label>
            <label htmlFor="tv">
              Tvshows
              <input id="tv" value="tv" name="media-type" type="radio" />
            </label>
          </div>
          <Dropdown>
            {({ isOpen, toggle, close, open }) => (
              <>
                <Button onClick={toggle} variant="icon">
                  Release dates{isOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
                <div
                  style={{ display: isOpen ? "flex" : "none" }}
                  className="bg-bg-500 flex-col flex w-fit px-md py-xl"
                >
                  <label htmlFor="from-year">
                    from year:
                    <input name="from-year" id="from-year" type="number" />
                  </label>

                  <label htmlFor="to-year">
                    to year:
                    <input name="to-year" id="to-year" type="number" />
                  </label>

                  <label htmlFor="release-year">
                    release year:
                    <input
                      name="release-year"
                      id="release-year"
                      type="number"
                    />
                  </label>
                </div>
              </>
            )}
          </Dropdown>
        </Form>
      </section>
    </>
  );
}
