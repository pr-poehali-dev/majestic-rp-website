"""
Business: Promo codes management - list, create, buy codes
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with promo codes data
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
        cursor.execute(
            "SELECT id, code, title, description, price, seller_id, status FROM promo_codes WHERE status = 'available' ORDER BY created_at DESC"
        )
        promos = cursor.fetchall()
        
        result = []
        for promo in promos:
            result.append({
                'id': promo[0],
                'code': promo[1],
                'title': promo[2],
                'description': promo[3],
                'price': promo[4],
                'seller_id': promo[5],
                'status': promo[6]
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
        action = body_data.get('action')
        
        if action == 'create':
            code = body_data.get('code')
            title = body_data.get('title')
            description = body_data.get('description', '')
            price = body_data.get('price')
            seller_id = body_data.get('seller_id')
            
            if not code or not title or not price or not seller_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT id FROM promo_codes WHERE code = %s",
                (code,)
            )
            if cursor.fetchone():
                cursor.close()
                conn.close()
                return {
                    'statusCode': 409,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Promo code already exists'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "INSERT INTO promo_codes (code, title, description, price, seller_id) VALUES (%s, %s, %s, %s, %s) RETURNING id",
                (code, title, description, price, seller_id)
            )
            promo_id = cursor.fetchone()[0]
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'id': promo_id, 'message': 'Promo code created'}),
                'isBase64Encoded': False
            }
        
        elif action == 'buy':
            promo_id = body_data.get('promo_id')
            buyer_id = body_data.get('buyer_id')
            
            if not promo_id or not buyer_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing promo_id or buyer_id'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT price, status FROM promo_codes WHERE id = %s",
                (promo_id,)
            )
            promo = cursor.fetchone()
            
            if not promo or promo[1] != 'available':
                cursor.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Promo code not available'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "UPDATE promo_codes SET status = 'sold', buyer_id = %s, sold_at = CURRENT_TIMESTAMP WHERE id = %s",
                (buyer_id, promo_id)
            )
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Promo code purchased successfully'}),
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
