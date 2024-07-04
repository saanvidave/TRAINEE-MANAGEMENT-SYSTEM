import frappe
from frappe.utils import nowdate
from frappe import _

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    total_records = f"Total Records = {len(data)}"
    total_trainees = get_distinct_trainee_count(filters)
    
    # Format the label with bold HTML tags
    summary_label = f"<strong>{_('TOTAL NUMBER OF ACTIVE TRAINEES')}</strong>"
    
    summary = [
        {"value": total_trainees, "style": "font-weight:bold;", "label": summary_label}
    ]
    
    return columns, data, total_records, None, summary

def get_columns():
    return [
        {
            "label": 'NAME',
            "fieldname": 'trainee_name',
            "fieldtype": 'Data',
            "width": 300
        },
        {
            "label": 'ATTENDANCE DATE',
            "fieldname": 'attendance_date',
            "fieldtype": 'Date',
            "width": 200
        },
        {
            "label": 'DAY',
            "fieldname": 'day',
            "fieldtype": 'Data',
            "width": 200
        },
        {
            "label": 'STATUS',
            "fieldname": 'status',
            "fieldtype": 'Data',
            "width": 200
        },
    ]

def get_data(filters):
    from_date = filters.get("from_date")
    to_date = filters.get("to_date")
    trainee_name = filters.get("trainee_name")

    if from_date and to_date and from_date > to_date:
        frappe.throw("From Date should not be greater than To Date.")

    conditions = ""
    if trainee_name:
        conditions += f" AND a.trainee_name LIKE '{trainee_name}%'"

    sql_query = f"""
        SELECT 
            a.trainee_name,
            b.attendance_date,
            b.day,
            b.status 
        FROM  
            `tabWEEKLY ATTENDANCE` AS a 
        INNER JOIN  
            `tabTABLE FOR ATTENDENCE` AS b ON b.parent = a.name
        WHERE 
            b.attendance_date BETWEEN '{from_date}' AND '{to_date}' 
            {conditions}
        ORDER BY 
            a.trainee_name, b.attendance_date DESC
    """

    # Fetching data from database
    attendance_data = frappe.db.sql(sql_query, as_dict=True)

    # Process each row to modify status field based on conditions
    for row in attendance_data:
        status = row.get('status')
        if status == "PRESENT":
            row['status'] = '<span style="color:green;font-weight:bold;">PRESENT</span>'
        elif status == "ABSENT":
            row['status'] = '<span style="color:red;font-weight:bold;">ABSENT</span>'
        elif status == "WO":
            row['status'] = '<span style="color:yellow;font-weight:bold;">WO</span>'

    return attendance_data

def get_distinct_trainee_count(filters):
    from_date = filters.get("from_date")
    to_date = filters.get("to_date")
    trainee_name = filters.get("trainee_name")

    conditions = ""
    if trainee_name:
        conditions += f" AND a.trainee_name LIKE '{trainee_name}%'"

    sql_query = f"""
        SELECT COUNT(DISTINCT a.trainee_name) AS trainee_count
        FROM  
            `tabWEEKLY ATTENDANCE` AS a 
        INNER JOIN  
            `tabTABLE FOR ATTENDENCE` AS b ON b.parent = a.name
        WHERE 
            b.attendance_date BETWEEN '{from_date}' AND '{to_date}' 
            {conditions}
    """

    result = frappe.db.sql(sql_query, as_dict=True)

    return result[0]['trainee_count'] if result else 0
