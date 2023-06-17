const express = require('express');
const puppeteer = require("puppeteer");
const router = express.Router();

// ROUTE 1: Get all the BlogItems using - GET "/api/blogItems/crawl"
router.get('/crawl',
    async (req, res) => {
        try {
            const browser = await puppeteer.launch({
                // headless: false,
                // defaultViewport: false,
                // userDataDir: "./tmp",
            });

            const page = await browser.newPage();
            await page.goto(
                'https://www.bornfitness.com/category/fitness/'
            );

            // const blogsHandles = await page.$$('div.site-main.archive-posts');
            const blogsHandles = await page.$$(
                'div.site-content > .content-area > .site-main.archive-posts > .category-fitness'
            );

            let blogs = [];

            for (const bloghandle of blogsHandles) {
                let title = "Null";
                let desp = "Null";
                let imageURL = "Null";
                let link = "Null";
                let tag = "Null";

                try {
                    title = await page.evaluate(
                        el => el.querySelector("header > h2 > a").textContent, bloghandle);
                }
                catch (error) { }

                try {
                    desp = await page.evaluate(
                        el => el.querySelector(".entry-content.base-content > p").textContent, bloghandle);
                } catch (error) { }

                try {
                    imageURL = await page.evaluate(
                        el => el.querySelector(".featured-image > img").getAttribute("src"), bloghandle);
                } catch (error) { }

                try {
                    link = await page.evaluate(
                        el => el.querySelector(".read-more__link").getAttribute("href"), bloghandle);
                } catch (error) { }

                try {
                    tag = await page.evaluate(
                        el => el.querySelector(".cat-links > a").textContent, bloghandle);
                } catch (error) { }


                // console.log(title, desp, imageURL);
                blogs.push({ title, desp, imageURL, link, tag });

            }
            res.status(200).send(blogs);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })

module.exports = router