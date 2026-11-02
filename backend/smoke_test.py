import urllib.request
import json
import time
import subprocess
import os

proc = subprocess.Popen(['node', 'server.js'], cwd=r'C:\Users\neele\.gemini\antigravity\scratch\smart-shaadi-mern\backend', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
time.sleep(2.5)

base_url = 'http://localhost:5000'
results = {}

def test_api(name, path, method='GET', data=None, headers=None):
    try:
        url = base_url + path
        h = {'Content-Type': 'application/json'}
        if headers:
            h.update(headers)
        body = json.dumps(data).encode() if data else None
        req = urllib.request.Request(url, data=body, headers=h, method=method)
        with urllib.request.urlopen(req, timeout=5) as res:
            res_data = json.loads(res.read().decode())
            results[name] = ('PASS', res.status, res_data)
            return res_data
    except Exception as e:
        results[name] = ('FAIL', str(e), None)
        return None

try:
    # 1. Health
    test_api('Health Check', '/api/health')

    # 2. Auth - Couple Login
    couple_login = test_api('Auth Couple Login', '/api/auth/login', 'POST', {'email': 'couple@smartshaadi.com', 'password': 'couple123'})
    token = couple_login.get('token') if couple_login else None
    auth_header = {'Authorization': f'Bearer {token}'} if token else {}

    # 3. Auth Me
    test_api('Auth Me (Verify Token)', '/api/auth/me', 'GET', headers=auth_header)

    # 4. Auth - Vendor Login
    test_api('Auth Vendor Login', '/api/auth/login', 'POST', {'email': 'wedmoire@smartshaadi.com', 'password': 'vendor123'})

    # 5. Auth - Admin Login
    test_api('Auth Admin Login', '/api/auth/login', 'POST', {'email': 'admin@smartshaadi.com', 'password': 'admin123'})

    # 6. Vendors List & Multi-Faith Filters
    test_api('Vendors - All List', '/api/vendors')
    test_api('Vendors - Filter by Faith (Muslim)', '/api/vendors?faith=Muslim')
    test_api('Vendors - Filter by Faith (Sikh)', '/api/vendors?faith=Sikh')
    test_api('Vendors - Filter by Faith (Christian)', '/api/vendors?faith=Christian')
    test_api('Vendors - Filter by Faith (Jain)', '/api/vendors?faith=Jain')
    test_api('Vendors - Filter by Category (Venue)', '/api/vendors?category=Venue')
    test_api('Vendors - Filter by City (Udaipur)', '/api/vendors?city=Udaipur')

    # 7. Wedding Planner
    test_api('Wedding - Get Profile', '/api/wedding', 'GET', headers=auth_header)
    test_api('Wedding - Update Budget', '/api/wedding', 'PUT', {'budget': 2800000}, headers=auth_header)
    task = test_api('Wedding - Add Task', '/api/wedding/tasks', 'POST', {'text': 'Test Haldi booking', 'category': 'Ritual'}, headers=auth_header)
    if task and 'id' in task:
        tid = task['id']
        test_api('Wedding - Toggle Task', f'/api/wedding/tasks/{tid}', 'PATCH', {'done': True}, headers=auth_header)
        test_api('Wedding - Delete Task', f'/api/wedding/tasks/{tid}', 'DELETE', headers=auth_header)

    sched = test_api('Wedding - Add Schedule Event', '/api/wedding/schedule', 'POST', {'event': 'Haldi Ceremony', 'date': '2026-11-26', 'time': '10:00 AM', 'location': 'Courtyard Lawn'}, headers=auth_header)
    if sched and 'id' in sched:
        sid = sched['id']
        test_api('Wedding - Delete Schedule Event', f'/api/wedding/schedule/{sid}', 'DELETE', headers=auth_header)

    # 8. Guests List & RSVP
    test_api('Guests - Get List', '/api/guests')
    guest = test_api('Guests - Add Guest', '/api/guests', 'POST', {'name': 'Shahid & Yasmin', 'group': 'Groom Side', 'diet': 'Halal Non-Vegetarian', 'plusOnes': 2})
    if guest and 'id' in guest:
        gid = guest['id']
        test_api('Guests - Update RSVP', f'/api/guests/{gid}', 'PATCH', {'rsvpStatus': 'Confirmed'})
        test_api('Guests - Delete Guest', f'/api/guests/{gid}', 'DELETE')

    # 9. WhatsApp Invite Generator
    test_api('Guests - WhatsApp Invite (Hindu)', '/api/guests/whatsapp-invite', 'POST', {'guestName': 'Sharma Family', 'faith': 'Hindu'})
    test_api('Guests - WhatsApp Invite (Muslim)', '/api/guests/whatsapp-invite', 'POST', {'guestName': 'Khan Family', 'faith': 'Muslim'})
    test_api('Guests - WhatsApp Invite (Sikh)', '/api/guests/whatsapp-invite', 'POST', {'guestName': 'Gill Family', 'faith': 'Sikh'})
    test_api('Guests - WhatsApp Invite (Christian)', '/api/guests/whatsapp-invite', 'POST', {'guestName': 'Fernandes Family', 'faith': 'Christian'})

    # 10. Bookings & Inquiries
    booking = test_api('Bookings - Create Inquiry', '/api/bookings', 'POST', {'vendorId': 'v1', 'vendorName': 'Riwaaz Palace', 'eventDate': '2026-11-28', 'notes': 'Test inquiry'}, headers=auth_header)
    if booking and 'id' in booking:
        bid = booking['id']
        test_api('Bookings - Vendor Quote', f'/api/bookings/{bid}/quote', 'POST', {'amount': 300000, 'message': 'Special quote', 'validUntil': '2026-11-15'})
        test_api('Bookings - Confirm Status', f'/api/bookings/{bid}/status', 'PATCH', {'status': 'confirmed'})

    # 11. AI Concierge
    test_api('AI - Budget Planner (Hindu)', '/api/ai/budget-planner', 'POST', {'totalBudget': 2500000, 'guestCount': 300, 'city': 'Jaipur', 'faith': 'Hindu'})
    test_api('AI - 3-Day Itinerary (Sikh)', '/api/ai/itinerary-generator', 'POST', {'faith': 'Sikh', 'coupleName': 'Harpreet & Simran'})
    test_api('AI - Ritual Advisor (Muslim Nikah)', '/api/ai/ask-pandit', 'POST', {'question': 'What is Mehr and how is it given?', 'faith': 'Muslim'})
    test_api('AI - Ritual Advisor (Christian)', '/api/ai/ask-pandit', 'POST', {'question': 'What are holy matrimony vows?', 'faith': 'Christian'})

    # 12. Shared Board
    test_api('Boards - Get Board', '/api/boards/royal-wedding-2026')
    test_api('Boards - Invite Member', '/api/boards/royal-wedding-2026/members', 'POST', {'email': 'uncle@family.com', 'role': 'Family Co-Host'})
    test_api('Boards - Post Note', '/api/boards/royal-wedding-2026/notes', 'POST', {'text': 'Smoke test note', 'author': 'Tester'})

    # 13. Digital Shagun & Gift Registry
    test_api('Shagun - Get Collection & QR', '/api/shagun')
    test_api('Shagun - Post Shagun Blessing', '/api/shagun', 'POST', {'guestName': 'Mama Ji', 'amount': 11000, 'blessing': 'Sada Sukhi Raho!'})

    # 14. Live Guest Photo Drop
    test_api('Photos - Get Candid Gallery', '/api/photos')
    new_photo = test_api('Photos - Upload Candid', '/api/photos', 'POST', {'guestName': 'Friend Priya', 'caption': 'Royal Baraat!', 'imageUrl': 'https://images.unsplash.com/photo-1519741497674-611481863552'})
    if new_photo and 'id' in new_photo:
        test_api('Photos - Like Photo', f"/api/photos/{new_photo['id']}/like", 'PATCH')

    # 15. Sangeet & DJ Playlist
    test_api('Playlist - Get Tracks Sorted by Votes', '/api/playlist')
    new_track = test_api('Playlist - Add Song Request', '/api/playlist', 'POST', {'title': 'Gallan Goodiyaan', 'artist': 'Shankar Mahadevan', 'category': 'Sangeet', 'requestedBy': 'Cousin Squad'})
    if new_track and 'id' in new_track:
        test_api('Playlist - Upvote Track', f"/api/playlist/{new_track['id']}/vote", 'PATCH')

    # 16. Seating & Dining Planner
    test_api('Tables - Get Floor Tables', '/api/tables')
    new_tbl = test_api('Tables - Create Dining Table', '/api/tables', 'POST', {'name': 'Table 9: VVIP Grandparents', 'capacity': 8, 'zone': 'Palace Terrace'})
    if new_tbl and 'id' in new_tbl:
        tbl_id = new_tbl['id']
        test_api('Tables - Assign Guest', f'/api/tables/{tbl_id}/assign', 'POST', {'guestName': 'Dadi Ji'})
        test_api('Tables - Unassign Guest', f'/api/tables/{tbl_id}/unassign', 'DELETE', {'guestName': 'Dadi Ji'})

finally:
    proc.terminate()
    proc.wait()

print('=== SMOKE TEST SUMMARY ===')
passed = 0
failed = 0
for k, v in results.items():
    status = v[0]
    if status == 'PASS':
        passed += 1
        print(f'PASS | {k} -> HTTP {v[1]}')
    else:
        failed += 1
        print(f'FAIL | {k} -> {v[1]}')
print(f'\nTOTAL: {passed} PASSED, {failed} FAILED')
