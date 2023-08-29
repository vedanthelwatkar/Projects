from tkinter import *
from PIL import ImageTk, Image
from tkinter.messagebox import *
import mysql.connector
from tkinter.scrolledtext import *
import requests
import geocoder
import re
import csv

root = Tk()
root.title("MyShopApp")
root.geometry("800x600+360+50")
root.configure(bg="lightsteelblue")
f = ("Arial",30,"bold")
a = ("Calibri",20,"bold")
b = ("Arial Round MT",20,"bold")
c = ("Courier",20,"bold")
d = ("Calibri",30,"bold")

g = geocoder.ip('me')
loc_label = Label(root,text="Location: " + str(g.city),font = f,bg="lightsteelblue")
loc_label.place(x=220,y=500)
loca = str(g.city)

a1 = "https://api.openweathermap.org/data/2.5/weather"
a2 = "?q=" + str(loca)
a3 = "&appid=" + "c6e315d09197cec231495138183954bd"
a4 = "&units=" + "metric"
wa = a1 + a2 + a3 + a4
res= requests.get(wa)
data = res.json()
tem = data ["main"]["temp"]

temp_label = Label(root,text="Temp: " + str(tem) ,font=f,bg="lightsteelblue")
temp_label.place(x=260,y=550)


def f1():
	root.withdraw()
	pr.deiconify()

def f2():
	pr.withdraw()
	root.deiconify()

def f3():
	root.withdraw()
	vp.deiconify()
	vp_st.delete(1.0,END)
	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="shop")
		cursor = con.cursor()
		sql = "select * from clt"
		cursor.execute(sql)
		data = cursor.fetchall()
		info = ""
		for d in data:
			info = info + "Id: " + str(d[0]) + "\n" + "Product: " + str(d[1]) + "\n" + "Address: " + str(d[2]) + "\n"
		vp_st.insert('insert',info)
	except Exception as e:
		if con is not None:
			showerror("Issue ",e)
	finally:
		if con is not None:
			con.close()
			

def f4():
	vp.withdraw()
	root.deiconify()

def f5():
	root.withdraw()
	cp.deiconify()

def f6():
	cp.withdraw()
	root.deiconify()

def f7():
	root.withdraw()
	up.deiconify()

def f8():
	up.withdraw()
	root.deiconify()

def f9() :
	answer = askyesno(title = 'confirmation', message = "Are you sure to exit ?")
	if answer :
			root.destroy()
root.protocol("WM_DELETE_WINDOW", f9)

def order():
	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="shop")
		address = pr_st.get(1.0,END)
		if address is None or len(address) < 10 or address.isalpha() or not any(char.isalpha() for char in address):
			showerror("Issue","Address must be above 10 characters")
			return
		else:
			clothes = ""	
			id = ""
			if not s.get:
				showerror("Issue","Please select a product")
				return
			if s.get() == 1:
				id = 1
				clothes = "Grey T-Shirt"
			elif s.get() == 2:
				id = 2
				clothes = "Green Sweatshirt"
			elif s.get() == 3:
				id = 3
				clothes = "Red Polo T-Shirt"
			elif s.get() == 4:
				id = 4
				clothes = "Beige T-Shirt"
			elif s.get() == 5:
				id = 5		
				clothes = "Blue Jeans"
			elif s.get() == 6:
				id = 6
				clothes = "Dark Blue Jeans"
			elif s.get() == 7:
				id = 7
				clothes = "Black Jeans"
			elif s.get() == 8:
				id = 8
				clothes = "Black Joggers"
			else:
				id = ""
				clothes = ""
			cursor = con.cursor()
			if id is None:
				showerror("Issue","Please select a product")
			sql = "insert into clt values ('%s','%s','%s')"
			values = (id,clothes,address)
			cursor.execute(sql % (values))
			con.commit()
			showinfo("SUCCESS!","Order Placed")		
	except Exception as e:
		con.rollback()
		showerror("Issue","Please select a product")
	finally:
		if con is not None:
			con.close()
			s.set(0)
			pr_st.delete(1.0,END)

def dele():
	def validate_id(id):
		pattern = re.compile("^[0-9]+$")
		if not pattern.match(str(id)):
			return False
		if int(id) <= 0:
			return False
		return True
		
	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="shop")
		if ei.get() == 0:
			showerror("Issue","Select the checkbox")
		else:
			id = int(ei_ent.get())
			if not validate_id(id) :
				showerror("ERROR","Only positive integers allowed for ID")
				return
			cursor = con.cursor()
			sql = "delete from clt where product_id = %s"
			values = (id,)
			result = cursor.execute(sql, values)
			if cursor.rowcount == 0:
				showerror("Issue","Order does not exists")
			else:
				con.commit()
				showinfo("Success!","Order Deleted Successfully")
	except Exception as e:
		showerror("issue","Only positive integers allowed for ID")
	finally:
		con.close()
		ei_ent.delete(0,END)
		ei.set(0)


def upda():
	def validate_id(id):
		pattern = re.compile("^[0-9]+$")
		if not pattern.match(str(id)):
			return False
		if int(id) <= 0:
			return False
		return True

	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="shop")
		id = int(up_ent.get())
		if not validate_id(id) :
			showerror("ERROR","Only positive integers allowed for ID")
			return
		address = up_st.get(1.0,END)
		if address is None or len(address) < 10 or address.isalpha() or not any(char.isalpha() for char in address):
			showerror("Issue","Address should be above 10 characters")
			return
		cursor = con.cursor()
		sql = "update clt set product_add = %s where product_id  = %s "
		cursor.execute(sql, (address.strip(), id))
		if cursor.rowcount == 0:
			showerror("Issue","Order does not exists")
		else:
			con.commit()
			showinfo("Success!","Order Updated Successfully")
	except Exception as e:
		if con is not None:
			con.rollback()
			showerror("ISSUE","Only positive integers allowed for ID")
	finally:
		if con is not None:
			con.close()
			up_ent.delete(0,END)
			up_st.delete(1.0,END)

def backup():
	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="shop")
		cursor = con.cursor()
		sql ="select * from clt"
		cursor.execute(sql)
		data = cursor.fetchall()
		with open('orders.csv', mode='w', newline='') as file:
			writer = csv.writer(file)
			writer.writerow(('Id','Product','Address'))
			for d in data:
				writer.writerow([d[0], d[1], d[2]])
		showinfo("SUCCESS!","Orders Exported to orders.csv")
	except Exception as e:
		if con is not None:
			print(e)
	finally:
		if con is not None:
			con.close()

btn_view = Button(root,text="View Products",font=f,width = 15,command=f1)
btn_view.pack(pady=10)
btn_vie = Button(root,text="View Orders",font=f,width =15,command = f3)
btn_vie.pack(pady=10)
btn_vi= Button(root,text="Update Address",font=f,width =15,command = f7)
btn_vi.pack(pady=10)
btn_v = Button(root,text="Cancel Orders",font=f,width =15,command = f5)
btn_v.pack(pady=10)
btn_= Button(root, text="Backup", font=f,width =15,command = backup)
btn_.pack(pady=10)


pr = Toplevel(root)
pr.title("Products")
pr.geometry("1100x680+110+30")
pr.configure(bg="lightskyblue1")

s = IntVar()
s.set(0)
image1 = Image.open("img1.jpg")
image1 = image1.resize((150,150))
photo1 = ImageTk.PhotoImage(image1)
pr_a_lab = Label(pr,image = photo1)
pr_a_lab.place(x=50,y=30)
pr_a = Radiobutton(pr,text="1. Grey \n T-Shirt \n Rs.599",font=a,bg="lightskyblue1",var=s , value=1)
pr_a.place(x=50,y=200)
image2 = Image.open("img2.jpg")
image2 = image2.resize((150,150))
photo2 = ImageTk.PhotoImage(image2)
pr_b_lab = Label(pr,image = photo2)
pr_b_lab.place(x=250,y=30)
pr_b = Radiobutton(pr,text="2. Green \n Sweatshirt \n Rs.799",font=a,bg="lightskyblue1",var=s , value=2)
pr_b.place(x=250,y=200)
image3 = Image.open("img3.jpg")
image3 = image3.resize((150,150))
photo3 = ImageTk.PhotoImage(image3)
pr_c_lab = Label(pr,image = photo3)
pr_c_lab.place(x=450,y=30)
pr_c = Radiobutton(pr,text="3. Red \n Polo T-shirt  \n Rs.699",font=a,bg="lightskyblue1",var=s , value=3)
pr_c.place(x=450,y=200)
image4 = Image.open("img4.jpg")
image4 = image4.resize((150,150))
photo4 = ImageTk.PhotoImage(image4)
pr_d_lab = Label(pr,image = photo4)
pr_d_lab.place(x=650,y=30)
pr_d = Radiobutton(pr,text="4. Beige \n T-shirt \n Rs.599",font=a,bg="lightskyblue1",var=s , value=4)
pr_d.place(x=650,y=200)
image5 = Image.open("img5.jpg")
image5 = image5.resize((150,200))
photo5 = ImageTk.PhotoImage(image5)
pr_e_lab = Label(pr,image = photo5)
pr_e_lab.place(x=50,y=330)
pr_e = Radiobutton(pr,text="5. Blue \n Jeans \n Rs.999",font=a,bg="lightskyblue1",var=s , value=5)
pr_e.place(x=50,y=550)
image6 = Image.open("img6.jpg")
image6 = image6.resize((150,200))
photo6 = ImageTk.PhotoImage(image6)
pr_f_lab = Label(pr,image = photo6)
pr_f_lab.place(x=250,y=330)
pr_f = Radiobutton(pr,text="6. Dark Blue \n Jeans \n Rs.1199",font=a,bg="lightskyblue1",var=s , value=6)
pr_f.place(x=250,y=550)
image7 = Image.open("img7.jpg")
image7 = image7.resize((150,200))
photo7 = ImageTk.PhotoImage(image7)
pr_g_lab = Label(pr,image = photo7)
pr_g_lab.place(x=450,y=330)
pr_g = Radiobutton(pr,text="7. Black \n Jeans \n Rs.899",font=a,bg="lightskyblue1",var=s , value=7)
pr_g.place(x=450,y=550)
image8 = Image.open("img8.jpg")
image8 = image8.resize((150,200))
photo8 = ImageTk.PhotoImage(image8)
pr_h_lab = Label(pr,image = photo8)
pr_h_lab.place(x=650,y=330)
pr_h = Radiobutton(pr,text="8. Black \n Joggers \n Rs.799",font=a,bg="lightskyblue1",var=s , value=8)
pr_h.place(x=650,y=550)
pr_save = Button(pr,text="Place \n Order",font=f,command=order)
pr_save.place(x=880,y=380)
pr_back = Button(pr,text="Back",font=f,command=f2)
pr_back.place(x=880,y=550)
pr_st = ScrolledText(pr,width = 15, height =9,font=b,bd=4)
pr_st.place(x=830,y=50)
pr_st_lab = Label(pr,text="Enter Address",font=a,bg="lightskyblue1")
pr_st_lab.place(x=860,y=10)
pr.withdraw()


vp = Toplevel(root)
vp.title("Orders")
vp.geometry("800x600+360+50")
vp.configure(bg="lightpink1")

vp_lab=Label(vp,text="Your Orders",font=d,bg="lightpink1")
vp_lab.place(x=300,y=30)
vp_st = ScrolledText(vp,font=a,width=40,height=11,bd=4)
vp_st.place(x=110,y=80)
vp_back = Button(vp,text="Back",font=f,command=f4)
vp_back.place(x=330,y=480)


vp.withdraw()

up = Toplevel(root)
up.title("Products")
up.geometry("800x600+360+50")
up.configure(bg="plum1")

up_lab=Label(up,text="Update Address",font=d,bg="plum1")
up_lab.place(x=300,y=30)
up_lab = Label(up,text="Enter Product Id:",font=a,bg="plum1")
up_lab.place(x=100,y=100)
up_ent = Entry(up,font=a,width=5,bd=4)
up_ent.place(x=100,y=150)
up_lab = Label(up,text="Enter new address:",font=a,bg="plum1")
up_lab.place(x=100,y=200)
up_st = ScrolledText(up,font=a,width=20,height=4,bd=4)
up_st.place(x=100,y=250)
up_cnfrm = Button(up,text="Confirm",font=f,command=upda)
up_cnfrm.place(x=305,y=400)
up_back = Button(up,text="Back",font=f,command=f8)
up_back.place(x=330,y=500)

up.withdraw()

cp = Toplevel(root)
cp.title("Cancel Orders")
cp.geometry("800x600+360+50")
cp.configure(bg="gray65")

ei = IntVar()
cp_lab=Label(cp,text="Cancel Order",font=d,bg="gray65")
cp_lab.place(x=300,y=30)
ei_lab = Label(cp,text="Enter Product Id:",font=a,bg="gray65")
ei_lab.place(x=100,y=100)
ei_ent = Entry(cp,font=a,width=5,bd=4)
ei_ent.place(x=100,y=150)
ei_cb = Checkbutton(cp,text="do you want to cancel the order?",font=a,bg="gray65",variable=ei)
ei_cb.place(x=100,y=250)
cp_cnfrm = Button(cp,text="Confirm",font=f,command=dele)
cp_cnfrm.place(x=305,y=400)
cp_back = Button(cp,text="Back",font=f,command=f6)
cp_back.place(x=330,y=500)

cp.withdraw()



root.mainloop()