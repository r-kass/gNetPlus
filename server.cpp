/*
 * Sockets-server - 
 * Simple server program to demonstrate sockets usage
 * CSS432
 */
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <netdb.h>
#include <netinet/tcp.h>
#include <sys/uio.h>
#include <stdio.h>
#include <stdlib.h>
#include <iostream>
using namespace std;

const int BUFFSIZE = 1500;
const int NUM_CONNECTIONS = 5;

main(int argc, char *argv[])
{
    int serverPort;
    char *serverName;
    char databuf[BUFFSIZE];
    bzero(databuf, BUFFSIZE);

    /* 
     * Build address
     */
    int port = 12345;
    sockaddr_in acceptSocketAddress;
    bzero((char *)&acceptSocketAddress, sizeof(acceptSocketAddress));
    acceptSocketAddress.sin_family = AF_INET;
    acceptSocketAddress.sin_addr.s_addr = htonl(INADDR_ANY);
    acceptSocketAddress.sin_port = htons(port);

    /*
     *  Open socket and bind
     */
    int serverSD = socket(AF_INET, SOCK_STREAM, 0);
    cout << "Socket #: " << serverSD << endl;
    const int on = 1;
    setsockopt(serverSD, SOL_SOCKET, SO_REUSEADDR, (char *)&on, sizeof(int));
   
    int rc = bind(serverSD, (sockaddr *)&acceptSocketAddress, sizeof(acceptSocketAddress));
    if (rc < 0)
    {
        cerr << "Bind Failed" << endl;
    }

    /*
     *  listen and accept
     */
    listen(serverSD, NUM_CONNECTIONS);       //setting number of pending connections

    while (true)
    {
        sockaddr_in newSockAddr;
        socklen_t newSockAddrSize = sizeof(newSockAddr);
        int newSD = accept(serverSD, (sockaddr *) &newSockAddr, &newSockAddrSize);
        cout << "Accepted Socket #: " << newSD <<endl;
 
        if (fork() == 0)
        {
            close(serverSD);

            for (int j = 0; j < 5; j++)
            {
               /*
                *  read from the socket
                */
               int bytesRead = read(newSD, databuf, BUFFSIZE);
               cout << "Bytes Read: " << bytesRead << endl;
               cout << databuf[0] << endl;

               /*
                *  write to socket
               */
               databuf[13] = 'R' + j;
               int bytesWritten = write(newSD, databuf, BUFFSIZE);
               cout << "Bytes Written: " << bytesWritten << endl;
            }
            close(newSD);
            exit(0);
        }
        else
        {
            close(newSD);
        }
    }
    close(serverSD);
    return 0;
}
