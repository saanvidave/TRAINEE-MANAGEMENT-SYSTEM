# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt

# import frappe

import frappe
from frappe.model.document import Document
from frappe import _

class TraineeDailyWorkStatus(Document):
    pass

    def validate(self):
        if not self.is_new():
            return

        existing_record = frappe.get_all("Trainee Daily Work Status",
        filters={'trainee_name': self.trainee_name,
                 'date': self.date,
                 'name': ['!=', self.name]})

        if existing_record:
            frappe.throw("Your Work Status has Already Fillup")