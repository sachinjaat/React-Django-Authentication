from users.serializers import GetFullUserSerializer
import requests
from users.models import LoginHistoryModel


def custom_jwt_response_handler(token, user=None, request=None):
    
    # get the ip address of the loggedin user

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    user_id = GetFullUserSerializer(user, context={'request' : request}).data['id']
    post_data = {'user_id': user_id, "ip": ip}

    print(user_id)
    print(GetFullUserSerializer(user, context={'request' : request}))

    #notify the team with user’s IP by sending a webhook

    response = requests.post('https://encrusxqoan0b.x.pipedream.net/', data=post_data)
    content = response.content

    #save ip address to LoginHistoryModel

    login_ip = LoginHistoryModel.objects.create(ip_address = ip, logged_in_user_id = user_id)
    login_ip.save()

    #return token and user

    return {
        'token' : token,
        'user' : GetFullUserSerializer(user, context={'request' : request}).data
    }