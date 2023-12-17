Feature("Liking Movies");

const id = [
  "6u9lf7okjh9kfw1e867",
  "rqdv5juczeskfw1e867",
  "fnfn8mytkpmkfw1e867",
  "w9pga3s2tubkfw1e867",
];

async function addFavorite(id, I) {
  await I.click({ css: `a[href="/#/detail/${id}"]` });
  I.wait(2);
  await I.click('button[id="favorite-add"]');
  await addReview("codecept", "e2e testing", I);
}

async function addReview(name, review, I) {
  await I.fillField("input#nama", name);
  await I.fillField("textarea#ulasan", review);
  await I.click('input[type="submit"]');
  I.wait(2);
}

Before(async ({ I }) => {
  await I.amOnPage("/#/");
});

Scenario(
  "Add Restaurant, Add Review Restaurant, Delete Restaurant",
  async ({ I }) => {
    const expectedNumber = id.length;

    for (let i = 0; i <= id.length - 1; i++) {
      await addFavorite(id[i], I);
      if (i === id.length - 1) {
        await I.amOnPage("/#/favorite");
      } else {
        await I.amOnPage("/#");
      }
    }

    await I.seeNumberOfElements("card-item", expectedNumber);

    for (let i = 1; i <= expectedNumber; i++) {
      console.log(await I.grabTextFrom(locate("#restaurant-title").at(i)));
    }

    for (let i = 1; i <= expectedNumber; i++) {
      I.wait(2);
      await I.click(locate(".detail-href"));
      I.wait(2);
      await I.seeElement("#favorite-delete");
      I.wait(2);
      await I.click("#favorite-delete");
      I.wait(2);
      await I.amOnPage("/#/favorite");
    }

    await I.seeNumberOfElements("card-item", 0);
    console.log("DONE");
  },
);
