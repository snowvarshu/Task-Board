from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime
from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(100), nullable=False)

    description = Column(String(500), nullable=True)

    status = Column(
        String(30),
        default="Todo"
    )

    priority = Column(
        String(20),
        default="Medium"
    )

    due_date = Column(Date, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )