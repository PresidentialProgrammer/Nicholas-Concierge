import requests
import sys
import json
from datetime import datetime

class NicholasConciergeAPITester:
    def __init__(self, base_url="https://0dd30dfb-8a62-4bce-aa21-aebdc0a6e60a.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_fields=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response content if expected fields provided
                if expected_fields and response.content:
                    try:
                        response_data = response.json()
                        print(f"   Response preview: {json.dumps(response_data, indent=2)[:200]}...")
                        
                        # Validate expected fields for list responses
                        if isinstance(response_data, list) and len(response_data) > 0:
                            first_item = response_data[0]
                            for field in expected_fields:
                                if field not in first_item:
                                    print(f"⚠️  Warning: Expected field '{field}' not found in response")
                                else:
                                    print(f"   ✓ Field '{field}' present")
                        
                        # Validate expected fields for single object responses
                        elif isinstance(response_data, dict):
                            for field in expected_fields:
                                if field not in response_data:
                                    print(f"⚠️  Warning: Expected field '{field}' not found in response")
                                else:
                                    print(f"   ✓ Field '{field}' present")
                                    
                    except json.JSONDecodeError:
                        print(f"   ⚠️  Warning: Response is not valid JSON")
                        
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.content:
                    try:
                        error_data = response.json()
                        print(f"   Error details: {error_data}")
                    except:
                        print(f"   Error text: {response.text[:200]}")

            return success, response.json() if success and response.content else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200,
            expected_fields=["message"]
        )

    def test_membership_tiers(self):
        """Test membership tiers endpoint"""
        return self.run_test(
            "Membership Tiers",
            "GET",
            "membership-tiers",
            200,
            expected_fields=["id", "name", "price", "currency", "billing_cycle", "features", "is_popular"]
        )

    def test_nutrimeal_plans(self):
        """Test NutriMeal plans endpoint"""
        return self.run_test(
            "NutriMeal Plans",
            "GET",
            "nutrimeal-plans",
            200,
            expected_fields=["id", "name", "description", "image_url", "price_per_day", "ingredients", "nutritional_info"]
        )

    def test_contact_submission(self):
        """Test contact form submission"""
        test_contact = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "phone": "+1-868-123-4567",
            "service_type": "elite-shopping",
            "message": "This is a test contact inquiry for the Nicholas Concierge API testing."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_contact,
            expected_fields=["id", "name", "email", "service_type", "message", "created_at", "status"]
        )
        
        return success, response

    def test_service_request_submission(self):
        """Test service request submission"""
        test_request = {
            "client_name": f"Test Client {datetime.now().strftime('%H%M%S')}",
            "client_email": "testclient@example.com",
            "client_phone": "+1-868-987-6543",
            "service_category": "elite-shopping",
            "service_details": "Need personal shopping for luxury items - testing API functionality",
            "preferred_date": "2025-01-20",
            "preferred_time": "14:00",
            "urgency": "normal"
        }
        
        success, response = self.run_test(
            "Service Request Submission",
            "POST",
            "service-request",
            200,
            data=test_request,
            expected_fields=["id", "client_name", "client_email", "service_category", "service_details", "created_at", "status"]
        )
        
        return success, response

    def test_get_contact_inquiries(self):
        """Test getting contact inquiries (optional endpoint)"""
        return self.run_test(
            "Get Contact Inquiries",
            "GET",
            "contact",
            200,
            expected_fields=["id", "name", "email", "service_type", "message"]
        )

    def test_get_service_requests(self):
        """Test getting service requests (optional endpoint)"""
        return self.run_test(
            "Get Service Requests",
            "GET",
            "service-requests",
            200,
            expected_fields=["id", "client_name", "client_email", "service_category"]
        )

def main():
    print("🏆 Nicholas Concierge API Testing Suite")
    print("=" * 50)
    
    # Setup
    tester = NicholasConciergeAPITester()
    
    # Test all endpoints
    print("\n📡 Testing Core API Endpoints...")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test GET endpoints (data retrieval)
    tester.test_membership_tiers()
    tester.test_nutrimeal_plans()
    
    # Test POST endpoints (data submission)
    contact_success, contact_response = tester.test_contact_submission()
    service_success, service_response = tester.test_service_request_submission()
    
    # Test optional GET endpoints for retrieving submitted data
    tester.test_get_contact_inquiries()
    tester.test_get_service_requests()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All API tests passed! Backend is working correctly.")
        return 0
    else:
        failed_tests = tester.tests_run - tester.tests_passed
        print(f"⚠️  {failed_tests} test(s) failed. Please check the backend implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())