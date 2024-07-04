# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt

from frappe.model.document import Document
import frappe
from frappe import _

def execute(filters=None):
    columns = get_columns()
    data, summary = get_data(filters)
    total_records = f"Total Records = {len(data)}"
    return columns, data, total_records, None, summary

def get_columns():
    return [
        {
            "label": 'NAME',
            "fieldname": 'trainee',
            "fieldtype": 'Data',
            "width": 150
        },
        {
            "label": 'DATE',
            "fieldname": 'date',
            "fieldtype": 'Date',
            "width": 100
        },
        {
            "label": 'COMPLETED TASKS',
            "fieldname": 'completed_work',
            "fieldtype": 'Data',
            "width": 250
        },
        {
            "label": 'PENDING TASKS',
            "fieldname": 'pending_work',
            "fieldtype": 'Data',
            "width": 250
        },
        {
            "label": 'STATUS',
            "fieldname": 'status',
            "fieldtype": 'Data',
            "width": 100
        },
    ]

def get_data(filters):
    from_date = filters.get("from_date")
    to_date = filters.get("to_date")

    if from_date and to_date and from_date > to_date:
        frappe.throw("From Date should not be greater than To Date.")

    conditions = ""
    if filters.get('trainee'):
        conditions += f" AND trainee LIKE '{filters.get('trainee')}%'"
    
    doctypelist1 = frappe.db.sql(f"""
        SELECT a.trainee, a.date, a.completed_work, a.pending_work, b.status,
               SUM(CASE WHEN b.status = 'ACTIVE' THEN 1 ELSE 0 END) as active_count,
               SUM(CASE WHEN b.status = 'COMPLETED' THEN 1 ELSE 0 END) as completed_count,
               SUM(CASE WHEN b.status = 'INACTIVE' THEN 1 ELSE 0 END) as inactive_count,
               COUNT(*) as total_count
        FROM `tabWORK DONE STATUS` as a 
        INNER JOIN `tabTRAINEE DETAILS` as b
        ON a.trainee = b.full_name
        WHERE a.date BETWEEN '{from_date}' AND '{to_date}' {conditions}
        GROUP BY a.trainee, a.date, a.completed_work, a.pending_work, b.status
    """, as_dict=True)

    for row in doctypelist1:
        status = row.get('status')
        if status == "ACTIVE":
            row['status'] = '<span style="color:green;font-weight: bold">ACTIVE</span>'
        elif status == "COMPLETED":
            row['status'] = '<span style="color:orange;font-weight: bold">COMPLETED</span>'
        elif status == "INACTIVE":
            row['status'] = '<span style="color:red;font-weight: bold">INACTIVE</span>'

    # Extract summary counts from the first row, assuming all rows have the same counts
    summary = [
        {"value": sum(row.get('active_count', 0) for row in doctypelist1), "label": _("ACTIVE TRAINEE")},
        {"value": sum(row.get('completed_count', 0) for row in doctypelist1), "label": _("COMPLETED INTERNSHIP")},
        {"value": sum(row.get('inactive_count', 0) for row in doctypelist1), "label": _("INACTIVE TRAINEE")}
    ]

    return doctypelist1, summary
