from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    service_type: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"

class ContactInquiryCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    service_type: str
    message: str

class ServiceRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    client_email: str
    client_phone: Optional[str] = None
    service_category: str
    service_details: str
    preferred_date: str
    preferred_time: str
    urgency: str = "normal"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"

class ServiceRequestCreate(BaseModel):
    client_name: str
    client_email: str
    client_phone: Optional[str] = None
    service_category: str
    service_details: str
    preferred_date: str
    preferred_time: str
    urgency: str = "normal"

class MembershipTier(BaseModel):
    id: str
    name: str
    price: int
    currency: str
    billing_cycle: str
    features: List[str]
    is_popular: bool = False

class NutriMealPlan(BaseModel):
    id: str
    name: str
    description: str
    image_url: str
    price_per_day: int
    ingredients: List[str]
    nutritional_info: dict


# Routes
@api_router.get("/")
async def root():
    return {"message": "Nicholas Concierge API"}

@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    inquiry_dict = inquiry.dict()
    inquiry_obj = ContactInquiry(**inquiry_dict)
    await db.contact_inquiries.insert_one(inquiry_obj.dict())
    return inquiry_obj

@api_router.get("/contact", response_model=List[ContactInquiry])
async def get_contact_inquiries():
    inquiries = await db.contact_inquiries.find().to_list(1000)
    return [ContactInquiry(**inquiry) for inquiry in inquiries]

@api_router.post("/service-request", response_model=ServiceRequest)
async def create_service_request(request: ServiceRequestCreate):
    request_dict = request.dict()
    request_obj = ServiceRequest(**request_dict)
    await db.service_requests.insert_one(request_obj.dict())
    return request_obj

@api_router.get("/service-requests", response_model=List[ServiceRequest])
async def get_service_requests():
    requests = await db.service_requests.find().to_list(1000)
    return [ServiceRequest(**request) for request in requests]

@api_router.get("/membership-tiers", response_model=List[MembershipTier])
async def get_membership_tiers():
    tiers = [
        MembershipTier(
            id="student",
            name="UWI Life",
            price=199,
            currency="TTD",
            billing_cycle="month",
            features=[
                "2 errands per week",
                "5% discount on NutriMeal",
                "Access to shared concierge app",
                "Email support"
            ],
            is_popular=False
        ),
        MembershipTier(
            id="standard",
            name="Urban Assist",
            price=499,
            currency="TTD",
            billing_cycle="month",
            features=[
                "5 errands per week",
                "1 grocery run per week",
                "Basic NutriMeal plan access",
                "Priority email support",
                "Mobile app access"
            ],
            is_popular=True
        ),
        MembershipTier(
            id="premium",
            name="Nicholas Black",
            price=999,
            currency="TTD",
            billing_cycle="month",
            features=[
                "Unlimited errands (within reason)",
                "Priority scheduling",
                "Daily NutriMeal delivery",
                "Direct concierge hotline",
                "24/7 support",
                "Dedicated concierge manager"
            ],
            is_popular=False
        )
    ]
    return tiers

@api_router.get("/nutrimeal-plans", response_model=List[NutriMealPlan])
async def get_nutrimeal_plans():
    plans = [
        NutriMealPlan(
            id="balanced",
            name="Balanced Wellness",
            description="A perfect balance of proteins, carbs, and healthy fats for sustained energy throughout your day.",
            image_url="https://images.unsplash.com/photo-1544986581-efac024faf62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3NwaXRhbGl0eXxlbnwwfHx8fDE3NTQ1Nzc2NjR8MA&ixlib=rb-4.1.0&q=85",
            price_per_day=45,
            ingredients=["Grilled salmon", "Quinoa", "Roasted vegetables", "Avocado", "Mixed greens"],
            nutritional_info={"calories": 650, "protein": "35g", "carbs": "45g", "fat": "28g"}
        ),
        NutriMealPlan(
            id="power",
            name="Power Professional",
            description="High-protein, brain-boosting meals designed for busy executives and professionals.",
            image_url="https://images.unsplash.com/photo-1695606453406-a7f4b86c99b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3NwaXRhbGl0eXxlbnwwfHx8fDE3NTQ1Nzc2NjR8MA&ixlib=rb-4.1.0&q=85",
            price_per_day=55,
            ingredients=["Lean beef", "Sweet potato", "Spinach", "Blueberries", "Almonds"],
            nutritional_info={"calories": 720, "protein": "42g", "carbs": "48g", "fat": "24g"}
        ),
        NutriMealPlan(
            id="student",
            name="Student Fuel",
            description="Budget-friendly, nutritious meals that support focus and brain function during studies.",
            image_url="https://images.unsplash.com/photo-1741506131058-533fcf894483?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3NwaXRhbGl0eXxlbnwwfHx8fDE3NTQ1Nzc2NjR8MA&ixlib=rb-4.1.0&q=85",
            price_per_day=35,
            ingredients=["Chicken breast", "Brown rice", "Broccoli", "Chickpeas", "Greek yogurt"],
            nutritional_info={"calories": 580, "protein": "38g", "carbs": "52g", "fat": "18g"}
        )
    ]
    return plans

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()