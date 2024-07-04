frappe.query_reports["TRAINEE ATTENDANCE OVERVIEW"] = {
    "filters": [
        {
            "label": __("NAME"),
            "fieldname": "trainee_name",
            "fieldtype": "Data",
			"width":150
        },
        {
            "label": __("FROM DATE"),
            "fieldname": "from_date",
            "fieldtype": "Date",
			"width":150,
            "default": frappe.datetime.month_start()
        },
        {
            "label": __("TO DATE"),
            "fieldname": "to_date",
            "fieldtype": "Date",
			"width":150,
            "default": frappe.datetime.month_end()
        }
    ],

        
};
