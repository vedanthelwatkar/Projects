import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from pymongo import MongoClient
import traceback

# Setting up MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['company_database']
collection = db['companies']

print("MongoDB database and collection created successfully.")

# Setting up Selenium WebDriver
driver = webdriver.Chrome()

def scrape_company_details():
    try:
        # Navigating to the InsiderBiz website
        driver.get('https://www.insiderbiz.in/company-list/?page=1')

        # Scraping data from the first 10 pages
        for page in range(1, 11):
            print(f"Scraping data from page {page}...")

            # Finding the table rows
            rows = WebDriverWait(driver, 20).until(
                EC.presence_of_all_elements_located((By.XPATH, "//table[@id='WebGrid']/tbody/tr"))
            )

            # Extracting company details from each row
            for row in rows:
                try:
                    cin = row.find_element(By.XPATH, "./td[1]").text
                    company_name = row.find_element(By.XPATH, "./td[2]").text
                    roc = row.find_element(By.XPATH, "./td[3]").text
                    address = row.find_element(By.XPATH, "./td[4]").text

                    # Create a document for the company
                    company_doc = {
                        'cin': cin,
                        'company_name': company_name,
                        'roc': roc,
                        'address': address
                    }

                    # Insert the document into the MongoDB collection
                    collection.insert_one(company_doc)

                except NoSuchElementException as e:
                    print(f"An error occurred while extracting company details: {str(e)}")


            try:
                WebDriverWait(driver, 5).until(EC.invisibility_of_element_located((By.ID, "aswift_5")))
            except TimeoutException:
                pass

            # Navigating to the next page
            try:
                next_button = WebDriverWait(driver, 20).until(
                    EC.element_to_be_clickable((By.LINK_TEXT, 'Next'))
                )
                driver.execute_script("arguments[0].click();", next_button)
            except NoSuchElementException as e:
                print(f"An error occurred while navigating to the next page: {str(e)}")

            # Waiting for the next page to load
            time.sleep(3)

        print("Data scraping completed successfully!")
        print("The data is stored in 'companies' collection in the mongodb database")

    except Exception as e:
        print(f"An error occurred during data scraping: {str(e)}")
        traceback.print_exc()

    finally:
        # Close the WebDriver
        driver.quit()

if __name__ == '__main__':
    scrape_company_details()
