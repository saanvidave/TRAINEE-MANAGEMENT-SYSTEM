# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document
from frappe import _

class WORKDONESTATUS(Document):
    def validate(self):
        if not self.is_new():
            return
        if not self.date:
            self.date = date.today()
        trainee_status = frappe.get_value("TRAINEE DETAILS", self.trainee, "status")
        if trainee_status != "ACTIVE":
            frappe.throw(_("Trainee is not active. Cannot fill Work Status."))

        existing_record = frappe.get_all("WORK DONE STATUS",
                                         filters={'trainee': self.trainee,
                                                  'date': self.date,
                                                  'name': ['!=', self.name]})

        if existing_record:
            frappe.throw(_("Your Work Status has already been recorded for this date."))

