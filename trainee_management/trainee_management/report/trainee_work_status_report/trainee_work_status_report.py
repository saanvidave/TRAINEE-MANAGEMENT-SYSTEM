# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import nowdate

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {
            "label": 'Id',
            "fieldname": 'name',
            "fieldtype": 'Data',
            "width": 100
        },
        {
            "label": 'Name',
            "fieldname": 'trainee_name',
            "fieldtype": 'Data',
            "width": 100
        },
        {
            "label": 'Date',
            "fieldname": 'date',
            "fieldtype": 'Date',
            "width": 100
        },
        {
            "label": 'Task Complete',
            "fieldname": 'task_completed_today',
            "fieldtype": 'Data',
            "width": 200
        },
        {
            "label": 'Task Pending',
            "fieldname": 'pending_task',
            "fieldtype": 'Data',
            "width": 200
        }
    ]

def get_data(filters):
    from_date = filters.get("from_date")
    to_date = filters.get("to_date")

    if from_date and to_date and from_date > to_date:
        frappe.throw("From Date should not be greater than To Date.")

    conditions = " "
    if filters.get('trainee_name'):
        conditions += f" AND trainee_name LIKE '{filters.get('trainee_name')}%'"

    doctypelist = frappe.db.sql(f"""
        SELECT name, trainee_name, date, task_completed_today, pending_task
        FROM `tabTrainee Daily Work Status`
        WHERE date BETWEEN '{from_date}' AND '{to_date}' {conditions}
    """, as_dict=True, debug=True)

    return doctypelist
