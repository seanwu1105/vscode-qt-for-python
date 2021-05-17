from PyQt5.QtCore import QObject

class A(QObject):
    def hello(self):
        return self.tr("Hello")

class B(A):
    pass

a = A()
a.hello()

b = B()
b.hello()