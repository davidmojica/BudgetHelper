"""
BudgetHelper Extension
"""
import datetime

from q2_sdk.core.exceptions import TectonError
from q2_sdk.core.http_handlers.tecton_client_handler import Q2TectonClientRequestHandler


class BudgetHelperHandler(Q2TectonClientRequestHandler):

    CONFIG_FILE_NAME = 'BudgetHelper'  # configuration/BudgetHelper.py file must exist if REQUIRED_CONFIGURATIONS exist

    # REQUIRED_CONFIGURATIONS = {'FEATURE': None}

    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)

    @property
    def router(self):
        router = super().router
        router.update({
            'default': self.default,
            'submit': self.submit
        })

        return router

    def get(self):
        return {
            'message': "Hello World from extension get"
        }

    async def default(self):
        return {
            'message': 'Hello World from extension'
        }

    async def submit(self):
        name = self.form_fields.get('name')
        if not name:
            raise TectonError('Validation failed',
                              {'message': 'Please submit a name'})

        return {
            'name': name,
            'date': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
