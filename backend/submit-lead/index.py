import json
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(name: str, phone: str, email: str, object_type: str, message: str):
    """Отправляет письмо с заявкой на почту студии."""
    smtp_host = "smtp.yandex.ru"
    smtp_port = 465
    sender = "Studioda.1@yandex.ru"
    recipient = "Studioda.1@yandex.ru"
    password = os.environ.get("SMTP_PASSWORD", "")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name}"
    msg["From"] = sender
    msg["To"] = recipient

    email_row = f"""
        <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#888;">Email</td>
            <td style="padding:8px 0; border-bottom:1px solid #eee;"><a href="mailto:{email}" style="color:#b8924a;">{email}</a></td></tr>
    """ if email else ""

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
      <h2 style="color: #b8924a;">Новая заявка с сайта</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#888; width:140px;">Имя</td>
            <td style="padding:8px 0; border-bottom:1px solid #eee;"><b>{name}</b></td></tr>
        <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#888;">Телефон</td>
            <td style="padding:8px 0; border-bottom:1px solid #eee;"><b><a href="tel:{phone}" style="color:#b8924a;">{phone}</a></b></td></tr>
        {email_row}
        <tr><td style="padding:8px 0; border-bottom:1px solid #eee; color:#888;">Тип объекта</td>
            <td style="padding:8px 0; border-bottom:1px solid #eee;">{object_type}</td></tr>
        <tr><td style="padding:8px 0; color:#888; vertical-align:top;">Сообщение</td>
            <td style="padding:8px 0;">{message or '—'}</td></tr>
      </table>
    </body></html>
    """
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(sender, password)
        server.sendmail(sender, recipient, msg.as_string())


def handler(event: dict, context) -> dict:
    """Принимает заявку с формы обратной связи, сохраняет в БД и отправляет на почту студии."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    email = (body.get('email') or '').strip()
    object_type = (body.get('object_type') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO leads (name, phone, object_type, message) VALUES (%s, %s, %s, %s) RETURNING id, created_at",
        (name, phone, object_type, message)
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    send_email(name, phone, email, object_type, message)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'id': row[0]}, ensure_ascii=False)
    }
