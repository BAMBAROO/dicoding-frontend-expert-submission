import database from "../../src/scripts/utils/indexeddb";
import "../../src/scripts/custom-element/button-favorite";

describe('Like and Unlike a Restaurant', () => {
  beforeEach(async () => {
    const buttonAdd = await document.createElement("button-favorite");
    buttonAdd.button = "add";
    buttonAdd.data = {
      id: '1', name: "random", description: "random", pictureId: "random", city: "random", rating: "random"
    };

    const buttonDelete = await document.createElement("button-favorite");
    buttonDelete.button = "delete";
    buttonDelete.data = {
      id: '1', name: "random", description: "random", pictureId: "random", city: "random", rating: "random"
    };

    document.body.appendChild(buttonAdd);
    document.body.appendChild(buttonDelete);
  })
  it("Liking a Restaurant", async () => {
    document.querySelector("#favorite-add")
      .dispatchEvent(new Event("click"));

    const dataTrue = await database.getMovie("1").then((record) => {
      return record
    });

    const dataFalse = await database.getMovie("2").then((record) => {
      return record
    });


    expect(dataTrue).toStrictEqual({
      id: '1', name: "random", description: "random", pictureId: "random", city: "random", rating: "random"
    });

    expect(dataFalse).toBe(undefined)
  });

  it("Unlike a Restaurant", async () => {
    document.querySelector("#favorite-delete")
      .dispatchEvent(new Event("click"));

    const data = await database.getMovie("1").then((record) => {
      return record;
    });

    expect(data).toBe(undefined)

    expect(data).not.toStrictEqual({
      id: '1', name: "random", description: "random", pictureId: "random", city: "random", rating: "random"
    });
  });
})