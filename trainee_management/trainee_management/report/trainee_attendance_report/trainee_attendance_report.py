# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt
import frappe
from frappe import _

def execute(filters=None):
    columns = get_columns(filters)
    data = get_data(filters)
    return columns, data

def get_columns(filters):
    return [
        {
            "label": _('Trainee Name'),
            "fieldname": 'trainee_name',
            "fieldtype": 'Data',
            "width": 200
        },
    ] + get_date_columns(filters) 

def get_date_columns(filters):
    from_date = filters.get("from_date")
    to_date = filters.get("to_date")

    date_columns = []

    while from_date <= to_date:
        date_columns.append({
            "label": frappe.utils.formatdate(from_date),
            "fieldname": frappe.utils.formatdate(from_date),
            "fieldtype": 'Data',
            "width": 100
        })
        from_date = frappe.utils.add_days(from_date, 1)

    return date_columns

def get_data(filters):
    conditions = " "
    if filters.get('trainee_name'):
        conditions += f" AND trainee_name LIKE '{filters.get('trainee_name')}%'"

    from_date = filters.get("from_date")
    to_date = filters.get("to_date")

    if from_date and to_date and from_date > to_date:
        frappe.throw("Select a valid date Range.")

    query = f"""
        SELECT trainee_name, attendance_date, status, half_day_status
        FROM `tabTrainee Attendance`
        WHERE attendance_date BETWEEN '{from_date}' AND '{to_date}' {conditions}
    """
    doctypelist = frappe.db.sql(query, as_dict=True, debug=True)

    transposed_data = {}
    for row in doctypelist:
        trainee_name = row.get('trainee_name')
        attendance_date = row.get('attendance_date')
        status = row.get('status')
        half_day_status = row.get('half_day_status', '')

        if trainee_name not in transposed_data:
            transposed_data[trainee_name] = {'trainee_name': trainee_name, 'status': status}

        transposed_data[trainee_name][frappe.utils.formatdate(attendance_date)] = f"{status} {half_day_status}"

    data_list = list(transposed_data.values())
    return data_list
    





