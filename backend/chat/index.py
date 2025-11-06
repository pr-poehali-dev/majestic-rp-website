"""
Business: Chat system for promo code buyers and sellers
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with chat messages
"""

import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        promo_id = params.get('promo_id')
        
        if not promo_id:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing promo_id parameter'}),
                'isBase64Encoded': False
            }
        
        cursor.execute(
            "SELECT id, sender_id, message, created_at FROM chat_messages WHERE promo_code_id = %s ORDER BY created_at ASC",
            (promo_id,)
        )
        messages = cursor.fetchall()
        
        result = []
        for msg in messages:
            result.append({
                'id': msg[0],
                'sender_id': msg[1],
                'message': msg[2],
                'created_at': msg[3].isoformat() if msg[3] else None
            })
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        promo_id = body_data.get('promo_id')
        sender_id = body_data.get('sender_id')
        message = body_data.get('message')
        
        if not promo_id or not sender_id or not message:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        cursor.execute(
            "INSERT INTO chat_messages (promo_code_id, sender_id, message) VALUES (%s, %s, %s) RETURNING id, created_at",
            (promo_id, sender_id, message)
        )
        result = cursor.fetchone()
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'id': result[0],
                'created_at': result[1].isoformat() if result[1] else None,
                'message': 'Message sent'
            }),
            'isBase64Encoded': False
        }
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
