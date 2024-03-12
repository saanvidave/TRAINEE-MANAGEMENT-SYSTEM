# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

class TraineeDailyWorkStatus(Document):
    pass

    def validate(self):
        if not self.is_new():
            return

        trainee_status = frappe.get_value("Trainee", self.trainee_name, "status")
        if trainee_status != "Active":
            frappe.throw(_("Trainee is not active. Can not Fill Work Status."))

        existing_record = frappe.get_all("Trainee Daily Work Status",
        filters={'trainee_name': self.trainee_name,
                 'date': self.date,
                 'name': ['!=', self.name]})

        if existing_record:
            frappe.throw(_("Your Work Status has already been recorded for this date."))
