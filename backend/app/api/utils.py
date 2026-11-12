import uuid


def is_valid_uuid(val):
    try:
        return str(uuid.UUID(str(val))) == str(val)
    except ValueError:
        return False
