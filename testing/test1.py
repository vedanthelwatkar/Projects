from selenium import webdriver
import time
import requests
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# from selenium.import.*

# Testing Home Page Images


def testing_images():
    options = webdriver.ChromeOptions()
    options.add_argument("start-maximized")
    options.add_argument('disable-infobars')

    driver = webdriver.Chrome(chrome_options=options,
                              executable_path=r'chromedriver.exe')
    driver.get('http://localhost:3000/')

    links = driver.find_elements(By.CSS_SELECTOR, 'img')

    print("Testing links...")

    start = time.time()

    working_links = 0

    bad_links = 0
    bad_links_list = []
    for link in links:
        # <img src="ht"
        r = requests.head(link.get_attribute('src'))
        if r.status_code != 400:
            working_links += 1
        else:
            bad_links += 1
            bad_links_list.append((link.get_attribute('src'), r.status_code))

    context = {"working_links": working_links,
               "bad_links_list": bad_links_list, "bad_links": bad_links,
               "links_len": len(links), "time_links": round((time.time() - start), 3)}
    print(context)
    return context


# Testing Login
def testing_Login():
    options = webdriver.ChromeOptions()
    options.add_argument("start-maximized")
    options.add_argument('disable-infobars')

    driver = webdriver.Chrome(chrome_options=options,
                              executable_path=r'chromedriver.exe')
    driver.get('http://localhost:3000/login')

    login = driver.find_element(By.CLASS_NAME, "login-email")
    login.send_keys("dk@gmail.com")
    password = driver.find_element(By.CLASS_NAME, "login-pass")
    password.send_keys("dk@69")
    loginBtn = driver.find_element(
        By.CLASS_NAME, "login-button")
    loginBtn.click()

    print("Testing login...")
    WebDriverWait(driver, 100).until(
        EC.presence_of_element_located((By.CLASS_NAME, "sculpt-home")))
    print("Login Test Successful!!")

# Testing SignUp


def testing_SignUp():
    options = webdriver.ChromeOptions()
    options.add_argument("start-maximized")
    options.add_argument('disable-infobars')

    driver = webdriver.Chrome(chrome_options=options,
                              executable_path=r'chromedriver.exe')
    driver.get('http://localhost:3000/register')

    firstName = driver.find_element(By.ID, "reg-firstName")
    firstName.send_keys("swamini")
    lastName = driver.find_element(By.ID, "reg-lastName")
    lastName.send_keys("dumbre")
    number = driver.find_element(By.ID, "reg-number")
    number.send_keys("2315585")
    email = driver.find_element(By.ID, "reg-email")
    email.send_keys("swdfdzdssa@gmail.com")
    password = driver.find_element(By.ID, "reg-pass")
    password.send_keys("swamini12")
    Cpassword = driver.find_element(By.ID, "reg-confirm")
    Cpassword.send_keys("swamini12")
    regBtn = driver.find_element(
        By.CLASS_NAME, "r-button")
    regBtn.click()

    print("Testing SignUp...")
    WebDriverWait(driver, 100).until(
        EC.presence_of_element_located((By.CLASS_NAME, "sculpt-home")))
    print("SignUp Test Successful!!")


testing_Login()
testing_SignUp()
testing_images()
