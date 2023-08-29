from tkinter import *
from tkinter.messagebox import *
from tkinter.scrolledtext import *
import mysql.connector
import matplotlib.pyplot as plt
import pandas as pd
import requests
import geocoder
import re

root =  Tk()
root.title("E.M.S")
root.geometry("700x700+450+40")
root.configure(bg="lightsteelblue")
f= ("Calibri",30,"bold")

g = geocoder.ip('me')
loc_label = Label(root,text="Location: " + str(g.city),font = f,bg="lightsteelblue")
loc_label.place(x=50,y=550)
loca = (g.city)

a1 = "https://api.openweathermap.org/data/2.5/weather"
a2 = "?q=" + (loca)
a3 = "&appid=" + "c6e315d09197cec231495138183954bd"
a4 = "&units=" + "metric"
wa = a1 + a2 + a3 + a4
res= requests.get(wa)
data = res.json()
tem = data ["main"]["temp"]

temp_label = Label(root,text="Temp: " + str(tem) ,font=f,bg="lightsteelblue")
temp_label.place(x=430,y=550)

def f1():
	root.withdraw()
	ae.deiconify()

def f2():
	ae.withdraw()
	root.deiconify()

def f3():
	root.withdraw()
	ve.deiconify()
	ve_st.delete(1.0,END)
	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="ems")
		cursor = con.cursor()
		sql = "select * from emp"
		cursor.execute(sql)
		data = cursor.fetchall()
		info = ""
		for d in data:
			info = info + "id: " + str(d[0]) + " name: " + str(d[1]) + " salary: " + str(d[2]) + "\n"
		ve_st.insert('insert',info)
	except Exception as e:
		if con is not None:
			showerror("Issue ",e)
	finally:
		if con is not None:
			con.close()
	
def f4():
	ve.withdraw()
	root.deiconify()

def f5():
	root.withdraw()
	ue.deiconify()

def f6():
	ue.withdraw()
	root.deiconify()

def f7():
	root.withdraw()
	de.deiconify()

def f8():
	de.withdraw()
	root.deiconify()

def f9():
	con = mysql.connector.connect(host="localhost", user="root", password="abc123", database="ems")
	cursor = con.cursor()
	sql = "SELECT name, salary FROM emp order by salary desc limit 5"
	cursor.execute(sql)
	results = cursor.fetchall()
	df = pd.DataFrame(results, columns=["name", "salary"])
	plt.bar(df["name"], df["salary"], color="Red")
	plt.xlabel("Name")
	plt.ylabel("Salary")
	plt.title("Top 5 Highest Paid Employees")
	plt.show()

def f10():
	root.withdraw()
	ch.deiconify()

def f11():
	ch.withdraw()
	root.deiconify()

def f12() :
	answer = askyesno(title = 'confirmation', message = "Are you sure to exit ?")
	if answer :
			root.destroy()
root.protocol("WM_DELETE_WINDOW", f12)

def validate_id(id):
	pattern = re.compile("^[0-9]+$")
	if not pattern.match(str(id)):
		return False
	if int(id) <= 0:
		return False
	return True

def validate_name(name):
	pattern = re.compile("^[a-zA-Z]+$")
	if not pattern.match(name):	 
		return False
	return True 

def validate_salary(salary):
	pattern = re.compile("^[1-9][0-9]*$")
	if not pattern.match(str(salary)):
		return False
	salary_int = int(salary)
	if salary_int <= 8000:
		return False
	return True

def save1():
	con = None
	try:
		id = (ae_ei_ent.get())
		if not validate_id(id) :
			showerror("ERROR","Only positive integers allowed for ID")
			return
		name = ae_en_ent.get()
		if not validate_name(name) :
			showerror("ERROR","Only alphabets allowed for Name")
			return
		salary = (ae_es_ent.get())
		if not validate_salary(salary):
			showerror("ERROR","Salary should be positive and above 8000")
			return
		if len(name)<2:
			showerror("ERROR","Name should be minimun 2 characters")
			return

		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="ems")
		cursor = con.cursor()
		sql = "select * from emp where id = %s"
		cursor.execute(sql,(id,))
		if cursor.fetchone() is not None:	
			showerror("Error","ID already exists")
			return

		sql = "insert into emp values (%s,'%s',%s)"
		cursor.execute(sql % (id,name,salary))
		con.commit()
		showinfo("Success!","Record Created successfully")
	except Exception as e:
		if con is not None:
			con.rollback()
			showerror("Issue","Enter Valid ID")
	finally:
		if con is not None:
			con.close()
			ae_ei_ent.delete(0,END)
			ae_en_ent.delete(0,END)
			ae_es_ent.delete(0,END)
			ae_ei_ent.focus()

def save2():
	def validate_id(id):
		pattern = re.compile("^[0-9]+$")
		if not pattern.match(str(id)):
			return False
		if int(id) <= 0:
			return False
		return True

	def validate_name(name):
		pattern = re.compile("^[a-zA-Z]+$")
		if not pattern.match(name):	 
			return False
		return True 

	def validate_salary(salary):
		pattern = re.compile("^[1-9][0-9]*$")
		if not pattern.match(str(salary)):
			return False
		salary_int = int(salary)
		if salary_int <= 8000:
			return False
		return True
	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="ems")
		id = (ue_ei_ent.get())
		if not validate_id(id) :
			showerror("ERROR","Only positive integers allowed for ID")
			return
		name = ue_en_ent.get()
		if not validate_name(name):
			showerror("ERROR","Only alphabets allowed for Name")
			return
		if len(name)<2:
			showerror("ERROR","Name should be minimun 2 characters")
			return
		salary = (ue_es_ent.get())
		if not validate_salary(salary):
			showerror("ERROR","Salary should be positive and above 8000")
			return
		cursor = con.cursor()
		sql = "update emp SET name = %s, salary = %s where id = %s"
		values = (name, salary, id)
		cursor.execute(sql, values)
		if cursor.rowcount == 0:
			showerror("Issue","Record does not exists")
		else:
			con.commit()
			showinfo("Success!","Record Updated Successfully")
	except Exception as e:
		if con is not None:
			con.rollback()
			showerror("Issue ",e)
	finally:
		if con is not None:
			con.close()
			ue_ei_ent.delete(0,END)
			ue_en_ent.delete(0,END)
			ue_es_ent.delete(0,END)
			ue_ei_ent.focus()

def save3():
	con = None
	try:
		con = mysql.connector.connect(host="localhost",user="root",
		password="abc123",database="ems")
		id = int(de_ei_ent.get())
		if id is None or id == " " :
			showerror("Error","Enter ID")
			return
		id = int(id)
		if not validate_id(id) :
			showerror("ERROR","Only positive integers allowed for ID")
			return
		cursor = con.cursor()
		sql = "delete from emp where id = %s"
		values = (id,)
		result = cursor.execute(sql, values)
		cursor.fetchone()
		if cursor.rowcount == 0:
			showerror("Issue","Record does not exists")
		else:
			con.commit()
			showinfo("Success!","Record Deleted Successfully")
	except Exception as e:
		showerror("ERROR","Only positive integers allowed for ID")
	finally:
		con.close()
		de_ei_ent.delete(0,END)




btn_add = Button(root,text="Add",font=f,width = 20,command=f1)
btn_view = Button(root,text="View",font=f,width = 20,command=f3)
btn_update = Button(root,text="Update",font=f,width = 20,command=f5)
btn_delete = Button(root,text="Delete",font=f,width = 20,command=f7)
btn_charts = Button(root,text="Charts",font=f,width = 20,command = f10)
btn_add.pack(pady=8)
btn_view.pack(pady=8)
btn_update.pack(pady=8)
btn_delete.pack(pady=8)
btn_charts.pack(pady=8)

#ae = add employee

ae = Toplevel(root)
ae.title("Add Emp")
ae.geometry("700x700+450+40")
ae.configure(bg="lightskyblue1")

ae_ei_lab = Label(ae,text="Enter ID",font=f,bg="lightskyblue1")
ae_ei_ent = Entry(ae,font=f,bd=4)
ae_en_lab = Label(ae,text="Enter Name",font=f,bg="lightskyblue1")
ae_en_ent = Entry(ae,font=f,bd=4)
ae_es_lab = Label(ae,text="Enter Salary",font=f,bg="lightskyblue1")
ae_es_ent = Entry(ae,font=f,bd=4)
ae_btn_save = Button(ae,text="Save",font=f,width=20,command = save1)
ae_btn_back = Button(ae,text= "Back",font=f,width=20,command =f2)
ae_ei_lab.pack(pady=10)
ae_ei_ent.pack(pady=10)
ae_en_lab.pack(pady=10)
ae_en_ent.pack(pady=10)
ae_es_lab.pack(pady=10)
ae_es_ent.pack(pady=10)
ae_btn_save.pack(pady=10)
ae_btn_back.pack(pady=10)
ae.withdraw()

#ve= view employee

ve = Toplevel(root)
ve.title("View Emp")
ve.geometry("700x700+450+40")
ve.configure(bg="lightpink1")

ve_st = ScrolledText(ve,width=32,height=10,font=f,bd=4)
ve_st.pack()
ve_btn_back = Button(ve,text="Back",font=f,command=f4)
ve_btn_back.pack(pady = 10)
ve.withdraw()

#ue = update employee

ue = Toplevel(root)
ue.title("Update Emp")
ue.geometry("700x700+450+40")
ue.configure(bg="tan1")

ue_ei_lab = Label(ue,text="Enter ID",font=f,bg="tan1")
ue_ei_ent = Entry(ue,font=f,bd=4)
ue_en_lab = Label(ue,text="Enter Name",font=f,bg="tan1")
ue_en_ent = Entry(ue,font=f,bd=4)
ue_es_lab = Label(ue,text="Enter Salary",font=f,bg="tan1")
ue_es_ent = Entry(ue,font=f,bd=4)
ue_btn_save = Button(ue,text="Save",font=f,width=20,command = save2)
ue_btn_back = Button(ue,text= "Back",font=f,width=20,command =f6)
ue_ei_lab.pack(pady=10)
ue_ei_ent.pack(pady=10)
ue_en_lab.pack(pady=10)
ue_en_ent.pack(pady=10)
ue_es_lab.pack(pady=10)
ue_es_ent.pack(pady=10)
ue_btn_save.pack(pady=10)
ue_btn_back.pack(pady=10)
ue.withdraw()


#delete employee

de = Toplevel(root)
de.title("Delete Emp")
de.geometry("700x700+450+40")
de.configure(bg="seagreen1")

de_ei_lab= Label(de,text="Enter ID",font=f,bg="seagreen1")
de_ei_ent = Entry(de,font=f,bd=4)
de_ei_lab.pack(pady=10)
de_ei_ent.pack(pady=10)
de_btn_save = Button(de,text="Save",font=f,width=20,command =save3)
de_btn_back = Button(de,text= "Back",font=f,width=20,command =f8)
de_btn_save.pack(pady=10)
de_btn_back.pack(pady=10)
de.withdraw()


#chart

ch = Toplevel(root)
ch.title = "Chart"
ch.geometry("700x700+450+40")
ch.configure(bg="thistle2")

ch_create_btn = Button(ch,text="Create Bar Chart",font=f,width=20,command = f9)
ch_create_btn.pack(pady =100)
ch_btn_back = Button(ch,text= "Back",font=f,width=20,command =f8)
ch_btn_back.pack(pady=20)
ch.withdraw()

root.mainloop()