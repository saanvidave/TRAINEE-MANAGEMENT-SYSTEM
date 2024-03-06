# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt
import frappe
from frappe import _, msgprint
from frappe.utils import nowdate


def execute(filters=None):
    
		columns = get_columns()
		data = get_data(filters)
		return columns, data


def get_columns():
    return [
        {
            "label" : _('Trainee Name'),
            "fieldname": 'trainee_name',
            "fieldtype":'Data',
            "width" : 200
        },
        {
            "label": _('Attendance Date'),
            "fieldname": 'attendance_date',
            "fieldtype": 'Date',
            "width": 200
        },
        {
           
            "label" : _('Status'),
            "fieldname": 'status', 
            "fieldtype":'Data',
            "width" : 200
        }
        
    ]
def get_data(filters):
	conditions = " "
	if(filters.get('trainee_name')):conditions += f" AND trainee_name LIKE '{filters.get('trainee_name')}%'"
    
	from_date = filters.get("from_date")
	to_date = filters.get("to_date")

	if from_date and to_date and from_date > to_date:
   		frappe.throw("Select a valid date Range.")

	doctypelist = frappe.db.sql(f"""SELECT trainee_name, attendance_date,status
								  FROM `tabTrainee Attendance`WHERE attendance_date
								 BETWEEN '{from_date}' AND '{to_date}' {conditions}""", as_dict=True, debug=True)
    
	return doctypelist

    
    
    


