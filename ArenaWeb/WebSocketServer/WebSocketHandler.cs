using Microsoft.Web.WebSockets;

namespace ArenaWeb
{
    public class JoystickWebSocketHandler : WebSocketHandler
    {
        /// <summary>
        /// Holds the connected clients.
        /// </summary>
        private static WebSocketCollection _clients = new WebSocketCollection();

        /// <summary>
        /// When a client connection opens.
        /// </summary>
        public override void OnOpen()
        {
            if (_clients.Count < 3)
            {
                // Add client.
                _clients.Add(this);
            }
            else
            {
                this.Close();
            }
        }

        /// <summary>
        /// When receiving a message from a client.
        /// </summary>
        /// <param name="message"></param>
        public override void OnMessage(string message)
        {
            // Broadcast message to all connected clients.
            _clients.Broadcast(message);
        }

        /// <summary>
        /// When receiving a message from a client.
        /// </summary>
        /// <param name="message"></param>
        public override void OnMessage(byte[] message)
        {
            // Broadcast message to all connected clients.
            _clients.Broadcast(message);
        }

        /// <summary>
        /// When a client connection closes.
        /// </summary>
        public override void OnClose()
        {
            // Remove client.
            _clients.Remove(this);
        }
    }
}