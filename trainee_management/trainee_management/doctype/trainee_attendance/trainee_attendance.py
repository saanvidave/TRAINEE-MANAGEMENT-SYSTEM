# Copyright (c) 2024, Trainee and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _


class TraineeAttendance(Document):
    pass
    def validate(self):
        if not self.is_new():
            return

        existing_record = frappe.get_all("Trainee Attendance",
        filters={'trainee_name': self.trainee_name, 
                 'attendance_date': self.attendance_date,
                 'name': ['!=', self.name]})

        if existing_record:
            frappe.throw("Your Attendance Already Fillup")

  


      